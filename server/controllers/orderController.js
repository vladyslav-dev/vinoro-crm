const OrderService = require('../services/OrderService');

module.exports.create = async (req, res, next) => {
    try {
        const data = req?.body?.data;

        if (data) {
            await OrderService.create(data);
            res.send("Success")
        }
    } catch (error) {
        next(error)
    }
}

module.exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await OrderService.getAll();
        res.json(orders)
    } catch (error) {
        next(error)
    }
}

module.exports.getOrderById = async (req, res, next) => {
    try {
        const id = req?.params?.id;

        if (id) {
            const order = await OrderService.getOne(id);
            return res.json(order)
        }

        return res.send({ message: 'Error, order id was not send' })
    } catch (error) {
        next(error)
    }
}

module.exports.updateOne = async (req, res, next) => {
    try {
        const id = req?.params?.id;
        const data = req?.body?.data;

        if (id && data) {
            const order = await OrderService.updateOne(id, data);
            return res.json(order)
        }

        return res.send({ message: 'Error, order id or data was not send' })

    } catch (error) {
        next(error)
    }
}