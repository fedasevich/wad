const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    subscriber: { type: DataTypes.BOOLEAN, defaultValue: false }
})

const Category = sequelize.define('category', {
    name: { type: DataTypes.STRING, allowNull: false },
    spent: { type: DataTypes.INTEGER, defaultValue: 0 },
    iconId: { type: DataTypes.INTEGER, defaultValue: 1 }
})

const Transaction = sequelize.define('transaction', {
    description: { type: DataTypes.STRING, allowNull: false },
    sum: { type: DataTypes.DOUBLE, defaultValue: 0 },
    walletId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
})


const Wallet = sequelize.define('wallet', {
    name: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.DOUBLE, defaultValue: 0 },
    currency: { type: DataTypes.STRING, allowNull: false }
})


User.hasMany(Category)
Category.belongsTo(User)


User.hasMany(Wallet)
Wallet.belongsTo(User)


Category.hasMany(Transaction)
Transaction.belongsTo(Category)


module.exports = {
    User, Category, Transaction, Wallet
}
