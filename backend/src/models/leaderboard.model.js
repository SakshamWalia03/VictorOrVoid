import mongoose from "mongoose";

const LeaderboardSchema = new mongoose.Schema({
    playerName: { type: String, required: true },
    productName: { type: String, required: true },
    listingPrice: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    roundsUsed: { type: Number, required: true },
    score: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Leaderboard', LeaderboardSchema);