const sequelize = require('../db')
const ApiError = require('../error/ApiError')

const { Category, Transaction } = require('../models/models')

const MAX_CATEGORY_NAME_LENGTH = 8

class CategoryController {
    async create(req, res, next) {
        const { name, iconId } = req.body
        const userId = req.user.id
        if (!name || !iconId) {
            return next(ApiError.badRequest('Wrong data'))
        }
        if (name.length > MAX_CATEGORY_NAME_LENGTH) {
            `Category name can't be longer than ${MAX_CATEGORY_NAME_LENGTH} symbols`
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
        if (newName.length > MAX_CATEGORY_NAME_LENGTH) {
            `Category name can't be longer than ${MAX_CATEGORY_NAME_LENGTH} symbols`
        }
        const userId = req.user.id;
        const update = {};

        if (newName) update.name = newName;
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

        const userId = req.user.id

        try {
            await sequelize.transaction(async (transaction) => {
                const deletedCategory = await Category.destroy({ where: { userId, id }, transaction })
                return res.json(deletedCategory)
            })
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

}

module.exports = new CategoryController()

