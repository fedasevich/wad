const ApiError = require('../error/ApiError')
const sequelize = require('../db')
const { Wallet, Transaction } = require('../models/models')


class WalletController {
    async create(req, res, next) {
        const { name } = req.body
        const userId = req.user.id

        if (!name) {
            next(ApiError.badRequest('Wrong data'))
        }

        const wallet = await Wallet.create({ name, userId })
        return res.json(wallet)
    }

    async get(req, res, next) {
        if (!req.user.id) {
            return next(ApiError.badRequest('Wrong data'))
        }

        const userId = req.user.id
        const wallets = await Wallet.findAll({
            where: { userId },
            order: [
                ['id', "ASC"]
            ]
        })
        return res.json(wallets)
    }

    async change(req, res, next) {
        const { newName, newBalance } = req.body;
        const id = req.params.id;

        if (!id || (!newBalance && !newName)) {
            return next(ApiError.badRequest('Wrong data'));
        }

        const userId = req.user.id;
        let sequelizeTransaction;

        try {
            sequelizeTransaction = await sequelize.transaction();

            const oldWallet = await Wallet.findOne({ where: { id, userId }, transaction: sequelizeTransaction });

            const updatedFields = {
                balance: Number.isInteger(newBalance) ? newBalance : oldWallet.balance,
                name: newName || oldWallet.name
            };

            await Wallet.update(updatedFields, { where: { id, userId }, transaction: sequelizeTransaction });

            const updatedWallet = await Wallet.findOne({ where: { id, userId }, transaction: sequelizeTransaction });

            await sequelizeTransaction.commit();

            return res.json(updatedWallet);
        } catch (error) {
            if (sequelizeTransaction) {
                await sequelizeTransaction.rollback();
            }
            return next(ApiError.badRequest('Error updating wallet'));
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;

        if (!id) {
            return next(ApiError.badRequest('Wrong data'));
        }

        const userId = req.user.id;

        try {
            await sequelize.transaction(async (transaction) => {
                const deletedWallet = await Wallet.destroy({ where: { userId, id }, transaction });
                res.json(deletedWallet);
            });
        } catch (error) {
            return next(ApiError.badRequest("Error deleting wallet"));
        }
    }

    async transfer(req, res, next) {
        const fromId = req.params.fromId;
        const toId = req.params.toId;

        const { amount } = req.body;

        if (typeof amount !== 'number' || !toId || !fromId) {
            return next(ApiError.badRequest("All fields must be filled"));
        }

        const userId = req.user.id;

        if (!userId) {
            return next(ApiError.badRequest('Wrong data'));
        }

        const transactionOptions = {
            transaction: await sequelize.transaction()
        };

        try {
            const [updatedFromWalletCount, updatedToWalletCount] = await Promise.all([
                Wallet.update({ balance: sequelize.literal(`balance - ${amount}`) }, {
                    where: { userId, id: fromId },
                    ...transactionOptions
                }),
                Wallet.update({ balance: sequelize.literal(`balance + ${amount}`) }, {
                    where: { userId, id: toId },
                    ...transactionOptions
                }),
            ]);

            if (updatedFromWalletCount[0] !== 1 || updatedToWalletCount[0] !== 1) {
                await transactionOptions.transaction.rollback();
                return next(ApiError.badRequest('Failed to update wallets'));
            }

            await transactionOptions.transaction.commit();

            return res.json([1]);
        } catch (error) {
            await transactionOptions.transaction.rollback();
            return next(ApiError.badRequest('Failed to update wallets'));
        }
    }

}

module.exports = new WalletController()