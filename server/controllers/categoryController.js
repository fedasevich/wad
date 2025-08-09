const sequelize = require('../db')
const ApiError = require('../error/ApiError')

const {Category, Transaction} = require('../models/models')

const MAX_CATEGORY_NAME_LENGTH = 8

class CategoryController {
    async create(req, res, next) {
        const {name, iconId} = req.body

        const userId = req.user.id

        if (!name || !iconId) {
            return next(ApiError.badRequest('Wrong data'))
        }

        if (name.length > MAX_CATEGORY_NAME_LENGTH) {
            return next(ApiError.badRequest(`Category name can't be longer than ${MAX_CATEGORY_NAME_LENGTH} symbols`))
        }

        try {
            const category = await Category.create({name, userId, iconId})
            
            return res.json(category)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async get(req, res, next) {
        const userId = req.user.id

        if (!userId) {
            return next(ApiError.badRequest('Wrong data'))
        }

        const categories = await Category.findAll({
            where: {userId},
            order: [
                ['id', "ASC"]
            ]
        })

        return res.json(categories)
    }

    async change(req, res, next) {
        const {newName, newIconId} = req.body;
        const id = req.params.id;

        if ((!newName && !newIconId) || !id) {
            return next(ApiError.badRequest('Not enough data'));
        }

        if (newName && newName.length > MAX_CATEGORY_NAME_LENGTH) {
            return next(ApiError.badRequest(`Category name can't be longer than ${MAX_CATEGORY_NAME_LENGTH} symbols`))
        }

        const userId = req.user.id;
        const update = {};

        if (newName) update.name = newName;
        if (newIconId) update.iconId = newIconId;

        let transaction;

        try {
            transaction = await sequelize.transaction()

            await Category.update(update, {where: {id, userId}, transaction})
            const updatedCategory = await Category.findOne({where: {id, userId}, transaction})

            if (!updatedCategory) {
                throw new Error('Category not found')
            }
            if (updatedCategory.isIncome) {
                throw new Error("Can't change income category")
            }

            await transaction.commit()
            return res.json(updatedCategory)
        } catch (error) {
            if (transaction) {
                await transaction.rollback()
            }
            return next(ApiError.badRequest(error.message))
        }
    }


    async delete(req, res, next) {
        const id = req.params.id;

        if (!id) {
            return next(ApiError.badRequest('Wrong data'))
        }

        const userId = req.user.id

        let transaction
        try {
            transaction = await sequelize.transaction()

            const deletedCount = await Category.destroy({where: {userId, id, isIncome: false}, transaction})

            if (deletedCount === 0) {
                throw new Error("Can't delete income category")
            }

            await transaction.commit()

            return res.json(deletedCount)
        } catch (error) {
            if (transaction) {
                await transaction.rollback()
            }

            return next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new CategoryController()
