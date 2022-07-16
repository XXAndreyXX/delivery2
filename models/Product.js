import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    imageUrl: String,
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    }
},
    {
        timestamps: true,
    },
);
export default mongoose.model('Product', ProductSchema);