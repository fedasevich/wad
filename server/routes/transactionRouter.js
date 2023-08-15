const Router = require('express')

const router = new Router()
const transactionController = require('../controllers/transactionController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, transactionController.create)
router.get('/', authMiddleware, transactionController.get)
router.put('/:id', authMiddleware, transactionController.change)
router.delete('/:id', authMiddleware, transactionController.delete)

module.exports = router;