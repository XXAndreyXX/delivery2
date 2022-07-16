import ShopModel from '../models/Shop.js';

export const getAll = async (req, res) => {
    try {
        // const shops = await ShopModel.find().exec();
        // res.json(shops);
        res.json('shops');
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to retrieve shops',
        });
    }
};