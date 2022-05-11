const Router = require('express').Router
const questionController = require('../controllers/questionController')

const router = new Router()

router.post('/question/send', questionController.send)

module.exports = router
