const Router = require('express')

const router = new Router()
const categoryController = require('../controllers/categoryController')
const authMiddleware = require('../middleware/authMiddleware')



router.post('/',authMiddleware,categoryController.create)
router.get('/',authMiddleware,categoryController.get)
router.put('/',authMiddleware,categoryController.change)
router.delete('/',authMiddleware,categoryController.delete)

module.exports = router;