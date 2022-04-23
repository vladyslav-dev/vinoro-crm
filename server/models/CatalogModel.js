const mongoose = require('mongoose')

const CatalogModel = new mongoose.Schema({
    order_id: {
        type: Number,
        require: true,
    },
    catalog_name: {
        ru: String,
        uk: String,
        en: String
      },
    catalog_image: {
        type: String,
        default: ''
    },
    visibility: {
        type: Boolean,
        default: true
    }
}, {collection: 'catalog'});

module.exports = mongoose.model('catalog', CatalogModel)