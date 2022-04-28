module.exports = class SearchProductsDto {
    id
    name
    category

    constructor(model) {
        this.id = model._id
        this.name = model.name
        this.category = model.category
    }
}