import ProductModel from '../models/Product.js';

export const getAll = async (req, res) => {
    try {
        const product = await ProductModel.find().populate('shop').exec();
        res.json(product);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to retrieve products',
        });
    }
};

export const getAllByShopId = async (req, res) => {
    try {
        const products = await ProductModel.find({ 'shop': req.params.shopId }).exec();
        res.json(products);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to retrieve products',
        });
    }
};