module.exports = class CategoryDtos {
    id
    order_id
    category_name
    category_image
    visibility
    catalog

    constructor(model) {
        this.id = model._id
        this.order_id = model.order_id
        this.category_name = model.category_name
        this.category_image = model.category_image
        this.visibility = model.visibility
        this.catalog = model.catalog
    }
}