const Router = require('express').Router
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.get('/order', orderController.getAllOrders)
router.get('/order/:id', orderController.getOrderById)
router.post('/order', orderController.create)
router.put('/order/:id', authMiddleware, orderController.updateOne)

module.exports = router
