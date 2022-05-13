const sendMail = require('../utils/sendOrderToEmail');
const OrderModel = require('../models/OrderModel');
const OrderDto = require('../dtos/orderDtos');

class OrderService {
    async create(data) {

        const productArray = Object.values(data.products).map(item => ({
            product_ref: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            discount_price: item.discount_price,
            bulk_price: item.bulk_price,
            quantity: item.quantity,
            total_price: item.total_price,
            current_price: item.current_price,
        }))

        const totalPrice = productArray.reduce((acc, product) => acc + product.total_price, 0);

        OrderModel.create({
            order_id: data.order_id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            phone: data.phone,
            city: data.city,
            local_address: data.local_address,
            post_adress: data.post_adress,
            post_number: data.post_number,
            payment: data.payment,
            created_at: data.created_at,
            products: productArray,
            order_price: totalPrice,
            lang: data.mailLanguage,
            confirmed: false,
            success: false
        }, function (err) {
            if (err) return console.error(err);
            sendMail(data, totalPrice);
        });
    }
    async getAll() {
        const orders = await OrderModel.find({}).sort({ order_id: -1 });

        const ordersDtos = orders.map(order => new OrderDto(order));

        return ordersDtos;
    }
    async getOne(id) {
        const order = await OrderModel.findById(id);

        const orderDto = new OrderDto(order)

        return orderDto;
    }
    async updateOne(id, data) {
        const order = await OrderModel.findByIdAndUpdate(id, data);

        const orderDto = new OrderDto(order)

        return orderDto;
    }
}

module.exports = new OrderService()