const Router = require('express')

const router = new Router()
const walletController = require('../controllers/walletController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, walletController.create)
router.get('/', authMiddleware, walletController.get)
router.put('/:id', authMiddleware, walletController.change)
router.delete('/:id', authMiddleware, walletController.delete)

module.exports = router;