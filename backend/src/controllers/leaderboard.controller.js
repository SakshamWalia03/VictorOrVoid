import Leaderboard from '../models/leaderboard.model.js';

// GET /api/leaderboard
const getLeaderboard = async (req, res) => {
    try {
        const entries = await Leaderboard.find()
            .sort({ finalPrice: 1, score: -1 })
            .limit(20)
            .select('playerName productName finalPrice listingPrice roundsUsed score createdAt');

        res.json({
            success: true,
            count: entries.length,
            data: entries
        });

    } catch (err) {
        console.error('getLeaderboard error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch leaderboard' });
    }
};

// GET /api/leaderboard/top/:n
const getTopN = async (req, res) => {
    try {
        const n = parseInt(req.params.n) || 10;

        if (n > 100) {
            return res.status(400).json({ success: false, error: 'Max allowed is 100' });
        }

        const entries = await Leaderboard.find()
            .sort({ finalPrice: 1, score: -1 })
            .limit(n)
            .select('playerName productName finalPrice roundsUsed score createdAt');

        res.json({
            success: true,
            count: entries.length,
            data: entries
        });

    } catch (err) {
        console.error('getTopN error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch top entries' });
    }
};

// GET /api/leaderboard/rank/:playerName
const getPlayerRank = async (req, res) => {
    try {
        const { playerName } = req.params;

        // Get player's best entry (lowest price)
        const playerEntry = await Leaderboard.findOne({ playerName })
            .sort({ finalPrice: 1 });

        if (!playerEntry) {
            return res.status(404).json({ success: false, error: 'Player not found' });
        }

        // Count how many players have a lower price
        const rank = await Leaderboard.countDocuments({
            finalPrice: { $lt: playerEntry.finalPrice }
        }) + 1;

        res.json({
            success: true,
            data: {
                playerName: playerEntry.playerName,
                finalPrice: playerEntry.finalPrice,
                roundsUsed: playerEntry.roundsUsed,
                score: playerEntry.score,
                rank
            }
        });

    } catch (err) {
        console.error('getPlayerRank error:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch player rank' });
    }
};


export { getLeaderboard, getTopN, getPlayerRank };