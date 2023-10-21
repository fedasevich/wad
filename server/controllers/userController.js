const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Category, Wallet, Transaction } = require('../models/models')
const currencyController = require('./currencyController')
const sequelize = require('../db')

const DEFAULT_CATEGORIES = [
    { name: "Groceries", iconId: 1 },
    { name: "Sport", iconId: 2 },
    { name: "Health", iconId: 3 },
    { name: "Transport", iconId: 4 },
    { name: "Leisure", iconId: 5 },
    { name: "Shopping", iconId: 6 },
    { name: "Education", iconId: 7 },
    { name: "Income", iconId: -2, isIncome: true }
]

const DEFAULT_WALLETS = [
    { name: "Cash" },
    { name: "Card" }
]

function createAllCategories(userId) {
    return Promise.all(DEFAULT_CATEGORIES.map(category => Category.create({ ...category, userId })));
}

function createAllWallets(userId) {
    return Promise.all(DEFAULT_WALLETS.map(wallet => Wallet.create({ ...wallet, userId })));
}

const generateJWT = (id, email, currencyId) => {
    return jwt.sign({ id, email, currencyId }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
    async registration(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Wrong email or password'));
        }

        try {
            const candidate = await User.findOne({ where: { email } });

            if (candidate) {
                return next(ApiError.badRequest('User with this email already exists'));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ email, password: hashPassword });

            const token = generateJWT(user.id, email, user.currencyId);

            Promise.all([
                createAllCategories(user.id),
                createAllWallets(user.id)
            ]);

            return res.json({ token });
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Wrong email or password'))
        }
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.badRequest("User doesn't exist"))
        }
        const compare = bcrypt.compareSync(password, user.password)
        if (!compare) {
            return next(ApiError.badRequest("Wrong password"))
        }
        const token = generateJWT(user.id, user.email, user.currencyId)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.currencyId)
        return res.json({ token })
    }

    async changeCurrencyId(req, res, next) {
        const { id: userId } = req.user;
        const { currencyId, convert, newCurrencyRate } = req.body;

        if (!currencyId || !userId || typeof newCurrencyRate !== 'number') {
            return next(ApiError.badRequest('Not enough data'));
        }

        let transaction;
        try {
            transaction = await sequelize.transaction();


            const updatedUserCount = await User.update({ currencyId }, { where: { id: userId }, returning: true });

            const user = updatedUserCount[1][0];

            if (updatedUserCount[0] !== 1) {
                return next(ApiError.badRequest('Something went wrong'));
            }

            const newExchangeRates = await currencyController.currencyService.getExchangeRates(userId)



            const updatedTransactionCount = await Transaction.update({ sum: sequelize.literal(`sum * ${newCurrencyRate}`) }, {
                where: { userId },
                returning: true,
                transaction
            })

            if (updatedTransactionCount[0] === 0 && updatedTransactionCount[0] !== updatedTransactionCount[1].length) {
                await transaction.rollback();
                return next(ApiError.badRequest('Something went wrong'));
            }

            let updatedWallets
            if (convert) {
                updatedWallets = await Wallet.update({ balance: sequelize.literal(`balance * ${newCurrencyRate}`) }, {
                    where: { userId },
                    returning: true,
                    transaction
                })
            }

            await transaction.commit();
            const token = generateJWT(user.id, user.email, user.currencyId);

            return res.json({
                rates: newExchangeRates, token,
                ...(updatedWallets && updatedWallets.length > 0 && { updatedWallets: updatedWallets[1] })
            });
        } catch (error) {
            console.log(error)
            if (transaction) {
                await transaction.rollback();
            }
            return next(ApiError.badRequest(error));
        }
    }

}

module.exports = new UserController()