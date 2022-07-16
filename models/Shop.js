import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    });
export default mongoose.model('Shop', ShopSchema);