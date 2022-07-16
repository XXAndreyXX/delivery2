
import express from 'express';
import mongoose from 'mongoose';
import { ShopController, ProductController } from './controllers/index.js';

mongoose.connect('mongodb+srv://admin:Znz99pTUygHXcpJ@cluster0.gbesg.mongodb.net/delivery?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch(err => console.log('DB error', err));
// .catch(() => console.log('DB error', err));
const app = express();
app.use(express.json());



app.get('/shops', ShopController.getAll);
app.get('/products', ProductController.getAll);
app.get('/shop/:shopId/products', ProductController.getAllByShopId);

////app.get('/shops/:id', ShopController.getOne);


// app.get('/', (req, res) => {
//     res.send('Hello World!!!');
// });
// app.post('/auth/login', (req, res) => {
//     console.log(req.body);
//     res.json({
//         success: true,
//     })
// });

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});