const CategoryModel = require('../models/CategoryModel');

module.exports = {
    getLastOrderId: async (model) => {
        const result = await model.findOne().sort({ order_id: -1 }).limit(1)
        if (result) {
            return result.order_id
        } else {
            return null
        }
    },
    getFolderName: async (categoryId) => {
        const category = await CategoryModel.findById(categoryId)
        const categoryName = category.category_name.en

        return categoryName.trim().toLowerCase().replace(/ /g, '_').replace(/\W/ig, '')
    },
    calcDate: (model) => {
        const newDaysLimit = 30;

        const pd = new Date(model.published_date);
        const nd = new Date();

        const days = Math.round( (nd.getTime() - pd.getTime()) / (1000 * 3600 * 24) );

        return (days > newDaysLimit)
    }
}