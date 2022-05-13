const mongoose = require('mongoose')

const BulkPriceModel = new mongoose.Schema({ from: Number, price: Number });

const OrderProduct = new mongoose.Schema({
    product_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    name: {
        ru: String,
        uk: String,
        en: String
    },
    image: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        require: true,
    },
    discount_price: {
        type: Number,
        default: null,
    },
    bulk_price: {
        type: [BulkPriceModel],
        default: []
    },
    quantity: Number,
    total_price: Number,
    current_price: Number
});

const OrderModel = new mongoose.Schema({
    order_id: {
        type: String,
        require: true,
    },
    name: String,
    surname: String,
    email: String,
    phone: String,
    city: String,
    local_address: {
        type: String,
        default: null,
    },
    post_adress: {
        type: String,
        default: null,
    },
    post_number: {
        type: String,
        default: null,
    },
    payment: String,
    products: {
        type: [OrderProduct],
        default: []
    },
    created_at: String,
    lang: String,
    order_price: Number,
    confirmed: {
        type: Boolean,
        default: false
    },
    success: {
        type: Boolean,
        default: false
    }
}, {collection: 'orders'});

module.exports = mongoose.model('orders', OrderModel)