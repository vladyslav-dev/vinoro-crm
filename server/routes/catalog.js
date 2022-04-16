const Router = require('express').Router
const catalogController = require('../controllers/catalogController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.get('/catalog', authMiddleware, catalogController.getAllCatalog)
router.post('/catalog', authMiddleware, catalogController.createCatalog)
router.put('/catalog', authMiddleware, catalogController.updateCatalog)

module.exports = router
