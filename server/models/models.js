const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
})

const Currency = sequelize.define('currency', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    currency: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false },
    symbol: { type: DataTypes.STRING, allowNull: false },
})

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    iconId: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
    isIncome: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    deletedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null }
}, {
    paranoid: true
})

const Transaction = sequelize.define('transaction', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING, allowNull: false },
    sum: { type: DataTypes.DOUBLE, defaultValue: 0, allowNull: false },
    deletedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null }
}, {
    paranoid: true
})


const Wallet = sequelize.define('wallet', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.DOUBLE, defaultValue: 0, allowNull: false },
    deletedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null }
}, {
    paranoid: true
})


User.hasMany(Category)
Category.belongsTo(User)


User.hasMany(Wallet)
Wallet.belongsTo(User)

User.belongsTo(Currency, {
    foreignKey: {
        name: 'currencyId',
        allowNull: false,
        defaultValue: 1,
    },
});

Category.hasMany(Transaction)
Transaction.belongsTo(Category)
Transaction.belongsTo(User)
Transaction.belongsTo(Wallet)

module.exports = {
    User, Category, Transaction, Wallet, Currency
}
