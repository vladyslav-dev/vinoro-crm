const sendMail = require('../utils/sendOrderToEmail');
const OrderModel = require('../models/OrderModel');

class OrderService {
    async sendMail(data) {

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
            lang: data.mailLanguage
        }, function (err) {
            if (err) return console.error(err);
            sendMail(data, totalPrice);
        });
    }
}

module.exports = new OrderService()