module.exports = class OrderDto {
    id
    lang
    order_id
    name
    surname
    email
    phone
    city
    local_address
    post_adress
    post_number
    payment
    products
    created_at
    order_price
    confirmed
    success

    constructor(model) {
        this.id = model._id
        this.lang = model.lang
        this.order_id = model.order_id
        this.name = model.name
        this.surname = model.surname
        this.email = model.email
        this.phone = model.phone
        this.city = model.city
        this.local_address = model.local_address
        this.post_adress = model.post_adress
        this.post_number = model.post_number
        this.payment = model.payment
        this.products = model.products
        this.created_at = model.created_at
        this.order_price = model.order_price
        this.confirmed = model.confirmed
        this.success = model.success
    }
}