import { v4 as uuidv4 } from 'uuid';
import Session from '../models/session.model.js';
import Leaderboard from '../models/leaderboard.model.js';
import Product from '../models/products.model.js';
import { callVictor } from '../services/ai.service.js';
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const isFinalOffer = (message) => {
    if (!message) return false;

    const triggers = [
        'final offer',
        'last offer',
        'take it or leave it',
        'this is my last',
        'final price',
        'not going higher',
        'best offer',
        'walk away',
        'that\'s it from me',
        'won\'t go higher',
        'won\'t go above',
        'final bid',
    ];

    const lower = message.toLowerCase();
    return triggers.some(trigger => lower.includes(trigger));
};


const startGame = async (req, res) => {
    try {
        const { playerName } = req.body;

        if (!playerName) {
            return res.status(400).json({ error: 'playerName is required' });
        }

        const product = await Product.findOne({ isActive: true });
        if (!product) {
            return res.status(404).json({ error: 'No active product found' });
        }

        const openingMessage = `So. You're interested in the ${product.name}. Smart taste. I'm asking $${product.listingPrice.toLocaleString()} — and that's already generous given its market value of $${product.marketValue.toLocaleString()}. Make your offer.`;

        const session = await Session.create({
            sessionId: uuidv4(),
            playerName,
            productId: product._id,
            currentAsk: product.listingPrice,
            history: [
                {
                    type: 'ai',
                    content: openingMessage
                }
            ]
        });

        res.status(201).json({
            sessionId: session.sessionId,
            victorMessage: openingMessage,
            currentAsk: product.listingPrice,
            round: 0,
            maxRounds: 8,
            product: {
                name: product.name,
                description: product.description,
                listingPrice: product.listingPrice,
                marketValue: product.marketValue
            }
        });

    } catch (err) {
        console.error('startGame error:', err);
        res.status(500).json({ error: 'Failed to start game' });
    }
};

const negotiate = async (req, res) => {
    try {
        const { sessionId, offer, message } = req.body;

        const session = await Session.findOne({ sessionId });
        if (!session) return res.status(404).json({ error: 'Session not found' });
        if (session.status !== 'active') return res.status(400).json({ error: 'Game already finished' });
        if (session.round >= 8) return res.status(400).json({ error: 'Maximum rounds reached' });

        const product = await Product.findById(session.productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        session.round += 1;


        if (offer && offer < product.floorPrice) {
            await session.save();
            return res.status(200).json({
                victorMessage: `I heard your offer of $${offer.toLocaleString()}. That's below my floor — you're wasting my time. Come back with something serious.`,
                counter: session.currentAsk,
                outcome: 'continue',
                dealPrice: null,
                round: session.round,
                currentAsk: session.currentAsk
            });
        }

        if (offer && offer > session.currentAsk) {
            await session.save();
            return res.status(200).json({
                victorMessage: `I see your offer of $${offer.toLocaleString()}... and I raise you nothing. My current ask is still $${session.currentAsk.toLocaleString()}. Don't get cute.`,
                counter: session.currentAsk,
                outcome: 'continue',
                dealPrice: null,
                round: session.round,
                currentAsk: session.currentAsk
            });
        }

        if (isFinalOffer(message) && offer) {
            if (offer >= product.floorPrice) {
                session.status = 'finished';
                await saveDeal(session, product, offer);
                await session.save();

                return res.status(200).json({
                    victorMessage: `You drive a hard bargain. Fine — $${offer.toLocaleString()} it is. Don't make me regret this.`,
                    counter: null,
                    outcome: 'deal',
                    dealPrice: offer,
                    round: session.round,
                    currentAsk: offer
                });
            }
            else {
                await session.save();
                return res.status(200).json({
                    victorMessage: `Your "final offer" of $${offer.toLocaleString()} is an insult. My floor is higher than that. Try again.`,
                    counter: product.floorPrice + 100,
                    outcome: session.round <= 8 ? 'continue' : "walkaway",
                    dealPrice: null,
                    round: session.round,
                    currentAsk: session.currentAsk
                });
            }
        }

        const { result, updatedHistory } = await callVictor({
            history: session.history,
            round: session.round,
            offer: offer || null,
            message: message || '',
            floorPrice: product.floorPrice,
            targetPrice: product.targetPrice,
            listingPrice: product.listingPrice,
            productName: product.name,
            victorMood: product.victorMood
        });

        session.history = updatedHistory;
        if (result.counter) session.currentAsk = result.counter;

        // ── End condition checks ──
        const isLastRound = session.round >= 8;
        const isDeal = result.outcome === 'deal';
        const isWalkaway = result.outcome === 'walkaway';

        if (isDeal || isWalkaway || isLastRound) {
            session.status = 'finished';

            if (isDeal && result.dealPrice) {
                if (result.dealPrice < product.floorPrice) {
                    result.outcome = 'continue';
                    result.dealPrice = null;
                    session.status = 'active';
                    result.counter = product.floorPrice;
                } else {
                    await saveDeal(session, product, result.dealPrice);
                }
            }

            if (isLastRound && !isDeal && !isWalkaway) {
                const lastOffer = offer && offer >= product.floorPrice ? offer : null;
                if (lastOffer) {
                    await saveDeal(session, product, lastOffer);
                    result.outcome = 'deal';
                    result.dealPrice = lastOffer;
                } else {
                    result.outcome = 'walkaway';
                }
            }
        }

        await session.save();

        res.json({
            victorMessage: result.message,
            counter: result.counter || null,
            outcome: result.outcome,
            dealPrice: result.dealPrice || null,
            round: session.round,
            currentAsk: session.currentAsk
        });

    } catch (err) {
        console.error('negotiate error:', err);
        res.status(500).json({ error: 'Negotiation failed' });
    }
};

const saveDeal = async (session, product, finalPrice) => {
    const score = Math.round(
        ((product.listingPrice - finalPrice) / product.listingPrice * 1000) - (session.round * 5)
    );

    await Leaderboard.create({
        playerName: session.playerName,
        productName: product.name,
        listingPrice: product.listingPrice,
        finalPrice,
        roundsUsed: session.round,
        score
    });
};

export { startGame, negotiate };