const sequelize = require('../db')
const ApiError = require('../error/ApiError')

const { Category, Transaction } = require('../models/models')

class CategoryController {
    async create(req, res, next) {
        const { name, iconId } = req.body
        const userId = req.user.id
        if (!name || !iconId) {
            return next(ApiError.badRequest('Wrong data'))
        }
        const category = await Category.create({ name, userId, iconId })
        return res.json(category)
    }

    async get(req, res, next) {
        const userId = req.user.id
        if (!userId) {
            return next(ApiError.badRequest('Wrong data'))
        }
        const categories = await Category.findAll({
            where: { userId },
            order: [
                ['id', "ASC"]
            ]
        })
        return res.json(categories)
    }

    async change(req, res, next) {
        const { newName, newSpent, newIconId } = req.body;
        const id = req.params.id;

        if ((!newSpent && !newName && !newIconId) || !id) {
            return next(ApiError.badRequest('Not enough data'));
        }

        const userId = req.user.id;
        const update = {};

        if (newName) update.name = newName;
        if (newSpent) update.spent = newSpent;
        if (newIconId) update.iconId = newIconId;

        let transaction;

        try {
            transaction = await sequelize.transaction();

            await Category.update(update, { where: { id, userId }, transaction });

            const updatedCategory = await Category.findOne({ where: { id, userId }, transaction });

            await transaction.commit();

            return res.json(updatedCategory);
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            return next(ApiError.badRequest(error));
        }
    }


    async delete(req, res, next) {
        const id = req.params.id;

        if (!id) {
            return next(ApiError.badRequest('Wrong data'))
        }
        const update = {
            categoryId: -1
        }
        const userId = req.user.id

        await Transaction.update(update, { where: { categoryId: id, userId } })

        try {
            await sequelize.transaction(async (SequelizeTransaction) => {
                const deletedCategory = await Category.destroy({ where: { userId, id } })
                return res.json(deletedCategory)
            })
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

}

module.exports = new CategoryController()

