module.exports = class SearchCategoryDto {
    id
    category_name

    constructor(model) {
        this.id = model._id
        this.category_name = model.category_name
    }
}