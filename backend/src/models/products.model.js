import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    listingPrice: { type: Number, required: true },
    floorPrice: { type: Number, required: true },
    targetPrice: { type: Number, required: true },
    marketValue: { type: Number, required: true },
    victorMood: { type: String, default: 'cold and calculating' },
    isActive: { type: Boolean, default: true }
});

export default mongoose.model('Product', ProductSchema);