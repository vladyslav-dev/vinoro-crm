const mongoose = require('mongoose')

const CategoryModel = new mongoose.Schema({
    order_id: {
        type: Number,
        require: true,
        unique: true,
    },
    category_name: {
        ru: String,
        uk: String,
        en: String
      },
    category_image: {
        type: String,
        default: ''
    },
    visibility: {
        type: Boolean,
        default: true
    },
    catalog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catalog'
    }
}, {collection: 'category'});

module.exports = mongoose.model('category', CategoryModel)