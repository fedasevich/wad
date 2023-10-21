const sequelize = require('../db')
const ApiError = require('../error/ApiError')
const { Op } = require("sequelize");
const { Transaction, Category, Wallet } = require('../models/models')

class TransactionController {
  async create(req, res, next) {
    const { description, sum, categoryId, walletId } = req.body;
    const userId = req.user.id;

    if (!description || typeof sum !== 'number' || !userId || !categoryId || !walletId) {
      return next(ApiError.badRequest('Wrong data'));
    }

    const transactionOptions = {
      transaction: await sequelize.transaction()
    };

    try {
      const [updatedWalletCount, newTransaction] = await Promise.all([

        Wallet.decrement(
          { balance: sum },
          {
            where: { userId, id: walletId },
            ...transactionOptions
          }
        ),
        Transaction.create({ description, sum, categoryId, walletId, userId }, transactionOptions)
      ]);

      if (!newTransaction || updatedWalletCount[0][1] !== 1) {
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


    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    if (walletId) {
      whereClause.walletId = walletId;
    }

    const queryOptions = {
      where: whereClause,
      order: [['id', sort]],
      limit,
      offset
    };

    if (fromDate && toDate) {
      whereClause.createdAt = {
        [Op.between]: [fromDate, toDate],
      };
      queryOptions.limit = undefined;
      queryOptions.offset = undefined;
    }


    try {
      const transactions = await Transaction.findAndCountAll(queryOptions);

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

        const { walletId, sum: oldSum } = oldTransaction;

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

        const wallet = await Wallet.findOne({ where: { userId, id: walletId } });

        if (wallet) {
          const walletSpent = parseFloat(wallet.balance) - parseFloat(oldSum) + parseFloat(newSum);
          await Wallet.update({ balance: walletSpent }, {
            where: { userId, id: walletId },
            transaction
          });
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


      const { walletId, sum } = transaction


      const deletePromises = []


      deletePromises.push(Wallet.update({ balance: sequelize.literal(`balance - ${sum}`) }, {
        where: { userId, id: walletId },
        ...transactionOptions
      }))



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