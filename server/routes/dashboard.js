const Router = require('express').Router
const dashboardController = require('../controllers/dashboardController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()

router.get('/dashboard', authMiddleware, dashboardController.getInfo)

module.exports = router
