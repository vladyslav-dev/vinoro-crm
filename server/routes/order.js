const Router = require('express').Router
const orderController = require('../controllers/orderController')

const router = new Router()

router.post('/order/send', orderController.sendMail)

module.exports = router
