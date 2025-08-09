require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const seedDatabase = require('./seed/seedDatabase')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        await seedDatabase()

        app.listen(PORT, () => console.log(`started ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
