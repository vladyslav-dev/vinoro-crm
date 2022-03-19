const { Schema, model } = require('mongoose')

const CatalogModel = new Schema({
    order_id: {
        type: Number,
        require: true,
        index: true,
        unique: true,
        default: 0
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

module.exports = model('catalog', CatalogModel)