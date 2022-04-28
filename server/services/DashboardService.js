const CatalogModel = require('../models/CatalogModel');
const CategoryModel = require('../models/CategoryModel');
const ProductModel = require('../models/ProductModel');

class DashboardService {

    async getInfo() {
        try {
            const catalog = await CatalogModel.find();

            const catalogInfo = await Promise.all(catalog.map(async (item) => {
                const categor = await CategoryModel.find({ catalog: item.id })

                const products = await Promise.all(categor.map(async (categ) => {
                    const res = await ProductModel.find({ category: categ._id })
                    return res
                }))

                return {
                    catalogId: item.id,
                    catalogName: item.catalog_name,
                    linkName: String(item.catalog_name.en).replaceAll(' ', '-'),
                    catalogImage: item.catalog_image,
                    totalCategory: categor.length,
                    totalProducts: products.flat().length
                }
            }));

            const totalProducts = catalogInfo.reduce((sum, item) => sum += item.totalProducts, 0)

            const newProduct = await ProductModel.find({ new: true });
            const discountPrice = await ProductModel.find({ discount_price: { $ne: null } });

            return {
                catalogInfo: catalogInfo,
                totalOrders: 0,             // add it later !!!!!!!!
                totalProducts: totalProducts,
                totalNewProducts: newProduct.length,
                totalDiscountPriceProducts: discountPrice.length,
            }

        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new DashboardService()