const utils = require('../utils');
const CategoryDto = require('../dtos/categoryDtos');
const CategoryModel = require('../models/CategoryModel');
const SearchCategoryDto = require('../dtos/searchCategoryDtos');
const ProductDto = require('../dtos/productDtos');

class CategoryService {
    async create(data) {
        const lastOrderId = await utils.getLastOrderId(CategoryModel);

        const category = new CategoryModel({
            category_name: data.category_name,
            category_image: data.category_image,
            visibility: data.visibility,
            order_id: lastOrderId ? lastOrderId + 1 : 1,
            catalog: data.catalog
        });

        await category.save();

        const categoryDto = new CategoryDto(category);

        return categoryDto
    }
    async update(data) {

        const category = await CategoryModel.findByIdAndUpdate(data.id, {
            ...data,
        }, { new: true })

        const categoryDto = new CategoryDto(category);

        return categoryDto;
    }
    async getAll() {
        const categoryList = await CategoryModel.find();

        const res = categoryList.map(item => new CategoryDto(item));

        return res;
    }
    async getSearchCategory() {
        const categoryList = await CategoryModel.find({}, ['_id', 'category_name']);

        const categoryDtos = categoryList.map(item => new SearchCategoryDto(item))

        return categoryDtos
    }
    async getOne(id) {
        const categoryOne = await CategoryModel.findById(id);

        const categoryDto = new CategoryDto(categoryOne)

        return categoryDto;
    }
}

module.exports = new CategoryService()