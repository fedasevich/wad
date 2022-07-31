const sequelize = require('../db')
const ApiError = require('../error/ApiError')

const { Transaction, Category, Wallet} = require('../models/models')




class TransactionController {
    async create(req,res,next) {
    const {description,sum,categoryId,walletId} = req.body 
    const userId = req.user.id
    if(!description || !sum || !userId || !categoryId ||!walletId) {
        return next(ApiError.badRequest('Wrong data')) 
    }
    
    try {
    await sequelize.transaction(async (SequelizeTransaction)=>{
//category find and update
const category = await Category.findOne({where:{id:categoryId,userId}}, { transaction: SequelizeTransaction })
       
const categoryUpdate = {
    spent:category.spent + sum
}
const updatedCategory = await Category.update(categoryUpdate,{where:{id:categoryId,userId},transaction: SequelizeTransaction })


// wallet find and update
const wallet = await Wallet.findOne({where:{userId,id:walletId}},{transaction:  SequelizeTransaction })
const walletSpent = wallet.balance - sum;
const walletUpdate = {
balance:walletSpent
}
const updatedWallet = await Wallet.update(walletUpdate,{where:{userId,id:walletId}, transaction: SequelizeTransaction })

// transaction create
const newTransaction = await Transaction.create({description,sum,categoryId,walletId,userId},  {transaction: SequelizeTransaction })


return res.json(newTransaction)
    });
 
      

  }catch(e){
        
            return next(ApiError.badRequest("Wrong data"))
      
       
    }
    }
    
    async get(req, res) {
      let {categoryId,walletId,page,limit,sort} = req.query
      page = page || 1
      sort = sort || 'DESC'
      limit = limit || 9
    
      let offset = page * limit - limit
      const userId = req.user.id
      if(!categoryId && !walletId) {     
      const transactions = await Transaction.findAndCountAll({
         where: {
            userId
         },
         order: [
          ['id', sort]
        ],
         limit,
         offset
      })
      return res.json(transactions)
      }    
      if(categoryId && !walletId) 
  {   
    const transactions = await Transaction.findAndCountAll({
        where: {
           categoryId,userId
        },
        order: [
          ['id', sort]
        ],
        limit,
        offset
     })
    }
     if(!categoryId && walletId) {
      const transactions = await Transaction.findAndCountAll({
        where: {
           walletId,userId
        },
        order: [
          ['id', sort]
        ],
        limit,
        offset
     })
     }
     if(categoryId && walletId) {
      const transactions = await Transaction.findAndCountAll({
        where: {
           walletId,categoryId,userId
        },
        order: [
          ['id', sort]
        ],
        limit,
        offset
     })
     }
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