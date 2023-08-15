const Router = require('express')

const router = new Router()

const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const transactionRouter = require('./transactionRouter')
const walletRouter = require('./walletRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/transaction', transactionRouter)
router.use('/wallet', walletRouter)


module.exports = router;