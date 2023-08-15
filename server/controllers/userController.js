const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Category, Wallet } = require('../models/models')

const DEFAULT_CATEGORIES = [
    { name: "Groceries", iconId: 1 },
    { name: "Health", iconId: 2 },
    { name: "Sport", iconId: 3 },
    { name: "Transport", iconId: 4 },
    { name: "Cosmetics", iconId: 5 },
    { name: "Shopping", iconId: 6 },
    { name: "Education", iconId: 7 }
]

const DEFAULT_WALLETS = [
    { name: "Cash", currency: "USD" },
    { name: "Card", currency: "USD" }
]


async function createAllCategories(userId) {
    return Promise.all(DEFAULT_CATEGORIES.map(category => Category.create({ ...category, userId })));
}

async function createAllWallets(userId) {
    return Promise.all(DEFAULT_WALLETS.map(wallet => Wallet.create({ ...wallet, userId })));
}

const generateJWT = (id, email, subscriber) => {
    return jwt.sign({ id, email, subscriber }, process.env.SECRET_KEY, { expiresIn: '24h' })

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

            const token = generateJWT(user.id, email, user.subscriber);

            Promise.all([
                createAllCategories(user.id),
                createAllWallets(user.id)
            ]);

            return res.json({ token });
        } catch (error) {
            return next(ApiError.internalServerError(error.message));
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
        const token = generateJWT(user.id, user.email, user.subscriber)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.subscriber)
        return res.json({ token })
    }

    async change(req, res, next) {

    }

}

module.exports = new UserController()