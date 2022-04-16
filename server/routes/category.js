const Router = require('express').Router
const categoryController = require('../controllers/categoryController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.get('/category', authMiddleware, categoryController.getAllCategory)
router.get('/category/:id', authMiddleware, categoryController.getOneCategory)
router.post('/category', authMiddleware, categoryController.createCategory)
router.put('/category', authMiddleware, categoryController.updateCategory)

module.exports = router