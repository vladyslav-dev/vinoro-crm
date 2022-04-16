const CatalogModel = require('../models/CatalogModel');
const utils = require('../utils');
const CatalogDto = require('../dtos/catalogDtos');

class CatalogService {
    async create(data) {
        const lastOrderId = await utils.getLastOrderId(CatalogModel);

        const catalog = new CatalogModel({
            catalog_name: data.catalog_name,
            catalog_image: data.catalog_image,
            visibility: data.visibility,
            order_id: lastOrderId ? lastOrderId + 1 : 1
        });

        await catalog.save();

        const catalogDto = new CatalogDto(catalog);

        return catalogDto

    }
    async getAll() {
        const catalog = await CatalogModel.find();

        const catalogDto = catalog.map(item => new CatalogDto(item));

        return catalogDto;
    }
}

module.exports = new CatalogService()