console.log('This script populates some test shops and products to your database.');

import async from 'async';
import mongoose from 'mongoose';
import Shop from './models/Shop.js';
import Product from './models/Product.js';


mongoose.connect('mongodb+srv://admin:Znz99pTUygHXcpJ@cluster0.gbesg.mongodb.net/delivery?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch(() => console.log('DB error', err));

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var shops = []
var products = []

function shopCreate(title, cb) {
    var shop = new Shop({ title: title });
    shop.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Shop: ' + shop);
        shops.push(shop)
        cb(null, shop)
    });
}

function productCreate(title, price, imageUrl, shop, cb) {
    let productdetail = {
        title: title,
        price: price,
        imageUrl: imageUrl,
        shop: shop,
    }
    var product = new Product(productdetail);
    product.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Product: ' + product);
        products.push(product)
        cb(null, product)
    });
}

function createGenreShops(cb) {
    async.series([
        function (callback) {
            shopCreate('McDonald', callback);
        },
        function (callback) {
            shopCreate('KFC', callback);
        },
        function (callback) {
            shopCreate('ATB', callback);
        },
        function (callback) {
            shopCreate('Silpo', callback);
        },
        function (callback) {
            shopCreate('WelMart', callback);
        },
    ],
        // optional callback
        cb);
}

function createProducts(cb) {
    async.parallel([
        function (callback) {
            productCreate('Burger', 50, '', shops[0], callback);
        },
        function (callback) {
            productCreate('Big Burger', 75, '', shops[1], callback);
        }, function (callback) {
            productCreate('Mega Burger', 100, '', shops[2], callback);
        }, function (callback) {
            productCreate('Super Burger', 125, '', shops[3], callback);
        }, function (callback) {
            productCreate('Burger', 50, '', shops[0], callback);
        },
    ],
        // optional callback
        cb);
}


async.series([
    createGenreShops,
    createProducts,
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Products: ' + products);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });
