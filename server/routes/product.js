const Router = require('express').Router
const productController = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.get('/products', authMiddleware, productController.getAllProducts)
router.get('/product/:id', authMiddleware, productController.getProduct)
router.post('/product', authMiddleware, productController.createProduct)
router.put('/product', authMiddleware, productController.updateProduct)

module.exports = router