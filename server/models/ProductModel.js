const mongoose = require('mongoose')

const BulkPriceModel = new mongoose.Schema({ from: Number, price: Number });

const ProductModel = new mongoose.Schema({
    order_id: {
        type: Number,
        require: true,
        unique: true,
    },
    name: {
        ru: String,
        uk: String,
        en: String
      },
    description: {
        ru: String,
        uk: String,
        en: String
    },
    image: {
        type: String,
        default: '',
        require: true,
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
    new: {
        type: Boolean,
        default: true,
        require: true,
    },
    product_count: {
        type: Number,
        default: 1,
    },
    availability: {
        type: Boolean,
        default: true,
        require: true,
    },
    visibility: {
        type: Boolean,
        default: true,
        require: true,
    },
    published_date: {
        type: Date,
        default: Date.now(),
        require: true,
    },
    modified_date: {
        type: Date,
        default: Date.now(),
        require: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
}, {collection: 'products'});

module.exports = mongoose.model('products', ProductModel)