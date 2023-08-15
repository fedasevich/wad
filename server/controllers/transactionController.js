const sequelize = require('../db')
const ApiError = require('../error/ApiError')
const { Op } = require("sequelize");
const { Transaction, Category, Wallet } = require('../models/models')

class TransactionController {

  async create(req, res, next) {
    const { description, sum, categoryId, walletId } = req.body;
    const userId = req.user.id;

    if (!description || !sum || !userId || !categoryId || !walletId) {
      return next(ApiError.badRequest('Wrong data'));
    }

    const transactionOptions = {
      transaction: await sequelize.transaction()
    };

    try {
      const [updatedCategoryCount, updatedWalletCount, newTransaction] = await Promise.all([
        Category.update({ spent: sequelize.literal(`spent + ${sum}`) }, {
          where: { id: categoryId, userId },
          ...transactionOptions
        }),
        Wallet.update({ balance: sequelize.literal(`balance - ${sum}`) }, {
          where: { userId, id: walletId },
          ...transactionOptions
        }),
        Transaction.create({ description, sum, categoryId, walletId, userId }, transactionOptions)
      ]);

      if (updatedCategoryCount[0] !== 1 || updatedWalletCount[0] !== 1) {
        await transactionOptions.transaction.rollback();
        return next(ApiError.badRequest('Failed to update category or wallet'));
      }

      await transactionOptions.transaction.commit();

      return res.json(newTransaction);
    } catch (error) {
      await transactionOptions.transaction.rollback();
      return next(ApiError.badRequest('Failed to create transaction'));
    }
  }


  async get(req, res) {
    const {
      categoryId,
      walletId,
      page = 1,
      limit = 9,
      sort = 'DESC',
      fromDate,
      toDate
    } = req.query;

    const offset = (page - 1) * limit;
    const userId = req.user.id;

    const whereClause = {
      userId,
    };

    if (fromDate && toDate) {
      whereClause.createdAt = {
        [Op.between]: [fromDate, toDate],
      };
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    if (walletId) {
      whereClause.walletId = walletId;
    }

    try {
      const transactions = await Transaction.findAndCountAll({
        where: whereClause,
        order: [['id', sort]],
        limit,
        offset
      });

      return res.json(transactions);
    } catch (error) {
      return next(ApiError.internal('Failed to fetch transactions'));
    }
  }



  async change(req, res, next) {
    const { newSum, newDescription } = req.body;
    const id = req.params.id;
    if ((!newSum && !newDescription) || !id) {
      return next(ApiError.badRequest('Wrong data'));
    }

    const userId = req.user.id;

    try {
      await sequelize.transaction(async (transaction) => {
        const oldTransaction = await Transaction.findOne({ where: { id, userId } });

        if (!oldTransaction) {
          return next(ApiError.notFound('Transaction not found'));
        }

        const { walletId, categoryId, sum: oldSum } = oldTransaction;

        let update = {};

        if (newSum) {
          update.sum = newSum;
        }

        if (newDescription) {
          update.description = newDescription;
        }

        if (!Object.keys(update).length) {
          return next(ApiError.badRequest('No valid updates provided'));
        }

        const updatedTransaction = await Transaction.update(update, {
          where: { id, userId },
          transaction
        });

        if (!newSum) {
          return res.json(updatedTransaction);
        }

        if (categoryId !== -1) {
          const category = await Category.findOne({ where: { id: categoryId, userId } });

          if (category) {
            const categoryNewSum = category.spent - oldSum + newSum;
            await Category.update({ spent: categoryNewSum }, {
              where: { id: categoryId, userId },
              transaction
            });
          }
        }

        if (walletId !== -1) {
          const wallet = await Wallet.findOne({ where: { userId, id: walletId } });

          if (wallet) {
            const walletSpent = parseFloat(wallet.balance) + parseFloat(oldSum) - parseFloat(newSum);
            await Wallet.update({ balance: walletSpent }, {
              where: { userId, id: walletId },
              transaction
            });
          }
        }

        return res.json(updatedTransaction);

      });
    } catch (error) {
      return next(ApiError.internal('Failed to update transaction'));
    }
  }



  async delete(req, res, next) {
    const id = req.params.id;
    const userId = req.user.id;

    if (!id || !userId) {
      return next(ApiError.badRequest('Wrong data'));
    }

    const transactionOptions = {
      transaction: await sequelize.transaction()
    };

    try {
      const transaction = await Transaction.findOne({
        where: { id, userId },
        ...transactionOptions
      });

      if (!transaction) {
        await transactionOptions.transaction.rollback();
        return next(ApiError.notFound('Transaction not found'));
      }


      const { categoryId, walletId, sum } = transaction


      const deletePromises = []

      if (categoryId !== -1) {
        deletePromises.push(Category.update({ spent: sequelize.literal(`spent - ${sum}`) }, {
          where: { id: categoryId, userId },
          ...transactionOptions
        }))
      }

      if (walletId !== -1) {
        deletePromises.push(Wallet.update({ balance: sequelize.literal(`balance + ${sum}`) }, {
          where: { userId, id: walletId },
          ...transactionOptions
        }))
      }


      deletePromises.push(transaction.destroy(transactionOptions))

      await Promise.all(deletePromises);


      await transactionOptions.transaction.commit();
      return res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      await transactionOptions.transaction.rollback();
      return next(ApiError.badRequest('Failed to delete transaction'));
    }
  }

}


module.exports = new TransactionController()