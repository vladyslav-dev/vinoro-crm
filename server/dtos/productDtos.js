module.exports = class ProductDtos {
    id
    order_id
    name
    description
    image
    price
    discount_price
    bulk_price
    new
    product_count
    availability
    visibility
    published_date
    modified_date
    category

    constructor(model) {
        this.id = model._id
        this.order_id = model.order_id
        this.name = model.name
        this.description = model.description
        this.image = model.image
        this.price = model.price
        this.discount_price = model.discount_price
        // this.new = !model.new ? model.new : checkIsNew ? false : true
        this.new = model.new
        this.product_count = model.product_count
        this.availability = model.availability
        this.visibility = model.visibility
        this.published_date = model.published_date
        this.modified_date = model.modified_date
        this.category = model.category
        this.bulk_price = model.bulk_price.map(item => ({
            id: item._id,
            price: item.price,
            from: item.from
        }))
    }

    // checkIsNew() {
    //     const newDaysLimit = 2; // change to 30 !!!!!!!!!!!!!!!!!!!

    //     const pd = new Date(model.published_date);
    //     const nd = new Date();

    //     const days = Math.round( (nd.getTime() - pd.getTime()) / (1000 * 3600 * 24) );

    //     return (days > newDaysLimit)
    // }
}