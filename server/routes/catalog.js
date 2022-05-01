const Router = require('express').Router
const catalogController = require('../controllers/catalogController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.get('/catalog', catalogController.getAllCatalog)
router.post('/catalog', authMiddleware, catalogController.createCatalog)

module.exports = router
