const Router = require('express')

const router = new Router()
const currencyController = require('../controllers/currencyController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/rates', authMiddleware, currencyController.getExchangeRates)

module.exports = router;