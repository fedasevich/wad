const {Currency} = require('../models/models')

async function seedDatabase() {
    const currencyCount = await Currency.count()
    if (currencyCount === 0) {
        await Currency.bulkCreate([
            {
                id: 1,
                currency: 'United States Dolar',
                code: 'USD',
                symbol: '$',
                createdAt: new Date('2023-09-23T19:53:35.000Z'),
                updatedAt: new Date('2023-09-23T19:53:35.000Z')
            },
            {
                id: 2,
                currency: 'Euro',
                code: 'EUR',
                symbol: '€',
                createdAt: new Date('2023-09-23T19:53:35.000Z'),
                updatedAt: new Date('2023-09-23T19:53:35.000Z')
            },
            {
                id: 3,
                currency: 'Czech koruna',
                code: 'CZK',
                symbol: 'Kč',
                createdAt: new Date('2023-09-23T19:53:35.000Z'),
                updatedAt: new Date('2023-09-23T19:53:35.000Z')
            },
            {
                id: 4,
                currency: 'Ukrainian hrivnia',
                code: 'UAH',
                symbol: '₴',
                createdAt: new Date('2023-09-23T19:53:35.000Z'),
                updatedAt: new Date('2023-09-23T19:53:35.000Z')
            },
            {
                id: 5,
                currency: 'Polish złoty',
                code: 'PLN',
                symbol: 'zł',
                createdAt: new Date('2023-09-23T19:53:35.000Z'),
                updatedAt: new Date('2023-09-23T19:53:35.000Z')
            }
        ])
    }
}

module.exports = seedDatabase