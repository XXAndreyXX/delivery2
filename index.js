
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ShopController, ProductController } from './controllers/index.js';

mongoose.connect('mongodb+srv://admin:Znz99pTUygHXcpJ@cluster0.gbesg.mongodb.net/delivery?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch(err => console.log('DB error', err));

const app = express();
app.use(express.json());
app.options('*', cors()) // include before other routes


app.get('/api/shops', cors(), ShopController.getAll);
app.get('/api/products', cors(), ProductController.getAll);
app.get('/api/shop/:shopId/products', cors(), ProductController.getAllByShopId);

////app.get('/shops/:id', ShopController.getOne);

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});