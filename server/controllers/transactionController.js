const sequelize = require('../db')
const ApiError = require('../error/ApiError')

const { Transaction, Category, Wallet} = require('../models/models')




class TransactionController {
    async create(req,res,next) {
    const {categoryName,sum,userId,categoryId,walletId} = req.body 
    if(!categoryName || !sum || !userId || !categoryId ||!walletId || req.user.id !==userId) {
        return next(ApiError.badRequest('Wrong data')) 
    }
    
    try {
    await sequelize.transaction(async (SequelizeTransaction)=>{
//category find and update
const category = await Category.findOne({where:{name:categoryName,id:categoryId}}, { transaction: SequelizeTransaction })
       
const categoryUpdate = {
    spent:category.spent + sum
}
const updatedCategory = await Category.update(categoryUpdate,{where:{name:categoryName,id:categoryId,userId},transaction: SequelizeTransaction })


// wallet find and update
const wallet = await Wallet.findOne({where:{userId,id:walletId}},{transaction:  SequelizeTransaction })
const walletSpent = wallet.balance + sum;
const walletUpdate = {
balance:walletSpent
}
const updatedWallet = await Wallet.update(walletUpdate,{where:{userId,id:walletId}, transaction: SequelizeTransaction })

// transaction create
const newTransaction = await Transaction.create({categoryName,sum,categoryId},  {transaction: SequelizeTransaction })


return res.json(newTransaction)
    });
 
      

  }catch(e){
        
            return next(ApiError.badRequest('Wrong data'))
      
       
    }
    }
    
    async get(req, res) {
      const {
         categoryName,
         userId,
         categoryId
      } = req.body
      let {
         page,
         limit
      } = req.body
      if (!categoryName || !categoryId || !userId || req.user.id !== userId) {
         return next(ApiError.badRequest('Wrong data'))
      }
      page = page || 1
      limit = limit || 9
      let offset = page * limit - limit
      const transactions = await Transaction.findAndCountAll({
         where: {
            categoryName,
            categoryId
         },
         limit,
         offset
      })
      return res.json(transactions)
   }

   async change(req, res,next) {
  
    const {newSum,userId,walletId,transactionId} = req.body 
    if( !newSum || !userId ||!walletId || req.user.id !==userId||!transactionId) {
        return next(ApiError.badRequest('Wrong data')) 
    }

    

   
    try {
      await sequelize.transaction(async (SequelizeTransaction)=>{

    const oldTransaction = await Transaction.findOne({where:{id:transactionId}}, { SequelizeTransaction })
    const categoryName = oldTransaction.categoryName
    const categoryId = oldTransaction.categoryId
    const oldSum = oldTransaction.sum
    const update = {
      sum:newSum,
      
  }
        const updatedTransaction = await Transaction.update(update,{where:{id:transactionId},transaction:SequelizeTransaction })

        const category = await Category.findOne({where:{name:categoryName,id:categoryId}}, { SequelizeTransaction })
       const categoryNewSum = (category.spent - oldSum)+ newSum
        const categoryUpdate = {
            spent: categoryNewSum
        }
      await Category.update(categoryUpdate,{where:{id:categoryId,userId},  transaction:SequelizeTransaction })
      const wallet = await Wallet.findOne({where:{userId,id:walletId}})
        const walletSpent = (wallet.balance - oldSum)+ newSum;
      const walletUpdate = {
        balance:walletSpent
    }
      await Wallet.update(walletUpdate,{where:{userId,id:walletId},  transaction:SequelizeTransaction })
        return res.json(updatedTransaction)
  })
  }catch(e){
       
        return next(ApiError.badRequest('Wrong data'))
       
    }
   }



async delete(req,res,next) {
 
  const {userId,walletId,transactionId} = req.body 
  if( !userId ||!walletId || req.user.id !==userId||!transactionId) {
      return next(ApiError.badRequest('Wrong data')) 
  }
  try {
    await sequelize.transaction(async (SequelizeTransaction)=>{

  const oldTransaction = await Transaction.findOne({where:{id:transactionId}}, { SequelizeTransaction })
  const categoryName = oldTransaction.categoryName
  const categoryId = oldTransaction.categoryId
  const oldSum = oldTransaction.sum
 
      const category = await Category.findOne({where:{name:categoryName,id:categoryId}}, { SequelizeTransaction })
     const categoryNewSum = (category.spent - oldSum)
      const categoryUpdate = {
          spent: categoryNewSum
      }
    await Category.update(categoryUpdate,{where:{id:categoryId,userId},  transaction:SequelizeTransaction })
    const wallet = await Wallet.findOne({where:{userId,id:walletId}})
      const walletSpent = (wallet.balance - oldSum)
    const walletUpdate = {
      balance:walletSpent
  }
    await Wallet.update(walletUpdate,{where:{userId,id:walletId},  transaction:SequelizeTransaction })
    const deletedTransaction = await Transaction.destroy({where:{id:transactionId,categoryId}})
      return res.json(deletedTransaction)
})
}catch(e){
     
      return next(ApiError.badRequest('Wrong data'))
     
  } 
}


}

module.exports = new TransactionController()