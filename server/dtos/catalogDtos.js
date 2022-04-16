module.exports = class CatalogDto {
    id
    order_id
    catalog_name
    catalog_image
    visibility

    constructor(model) {
        this.id = model._id
        this.order_id = model.order_id
        this.catalog_name = model.catalog_name
        this.catalog_image = model.catalog_image
        this.visibility = model.visibility
    }
}