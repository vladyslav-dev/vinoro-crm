const Router = require('express').Router
const productController = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.get('/products', productController.getAllProducts)
router.get('/search-products', productController.getSearchProducts)
router.get('/search-products-by-ids', productController.getSearchProductsByIds)
router.get('/category-products/:id', productController.getProductsByCategoryId)
router.get('/product/:id', productController.getProduct)
router.get('/discounted-products', authMiddleware, productController.getDiscountedProducts)
router.get('/new-products', authMiddleware, productController.getNewProducts)
router.post('/product', authMiddleware, productController.createProduct)
router.put('/product', authMiddleware, productController.updateProduct)
router.put('/product-order', authMiddleware, productController.updateProductOrder)

module.exports = router