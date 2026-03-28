import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    playerName: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    round: { type: Number, default: 0 },
    currentAsk: { type: Number, required: true },
    status: { type: String, default: 'active' },
    history: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now, expires: 3600 }
});

export default mongoose.model('Session', SessionSchema);