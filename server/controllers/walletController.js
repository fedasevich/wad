const ApiError = require('../error/ApiError')
const sequelize = require('../db')
const { Wallet, Transaction } = require('../models/models')


class WalletController {
    async create(req, res, next) {
        const { name, currency } = req.body
        const userId = req.user.id

        if (!name || !currency) {
            next(ApiError.badRequest('Wrong data'))
        }

        const wallet = await Wallet.create({ name, userId, currency })
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
        const { newCurrency, newName, newBalance } = req.body;
        const id = req.params.id;

        if (!id || (!newBalance && newCurrency && newName)) {
            return next(ApiError.badRequest('Wrong data'));
        }

        const userId = req.user.id;
        let sequelizeTransaction;

        try {
            sequelizeTransaction = await sequelize.transaction();

            const oldWallet = await Wallet.findOne({ where: { id, userId }, transaction: sequelizeTransaction });

            const updatedFields = {
                balance: isFinite(newBalance) ? newBalance : oldWallet.balance,
                currency: newCurrency || oldWallet.currency,
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
        const update = {
            walletId: -1
        };

        try {
            await sequelize.transaction(async (transaction) => {
                const deletedWallet = await Wallet.destroy({ where: { userId, id }, transaction });

                await Transaction.update(update, { where: { walletId: id, userId }, transaction });

                res.json(deletedWallet);
            });
        } catch (error) {
            return next(ApiError.badRequest("Error deleting wallet"));
        }
    }
}

module.exports = new WalletController()