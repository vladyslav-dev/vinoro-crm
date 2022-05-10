const OrderService = require('../services/OrderService');

module.exports.sendMail = async (req, res, next) => {
    try {
        const data = req?.body?.data;

        if (data) {
            await OrderService.sendMail(data);
            res.send("Success")
        }
    } catch (error) {
        next(error)
    }
}