const sequelize = require('../db')
const ApiError = require('../error/ApiError')
const { Op } = require("sequelize");
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
      let {categoryId,walletId,page,limit,sort,fromDate,toDate} = req.query
      page = page || 1
      sort = sort || 'DESC'
      limit = limit || 9
    
      let offset = page * limit - limit
      const userId = req.user.id
      if(fromDate && toDate) {
        const transactions = await Transaction.findAndCountAll({
          where: {
             userId,createdAt: {
              [Op.between]: [fromDate, toDate]
            }
          },
          order: [
           ['id', sort]
         ]
       })
       return res.json(transactions)
      }

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
      if(categoryId && !walletId) {   
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
     return res.json(transactions)
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
     return res.json(transactions)
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
     return res.json(transactions)
     }
   
   }
   

   async change(req, res,next) {
  
    const {newSum,newDescription,transactionId} = req.body 
    if( !newSum && !newDescription ||!transactionId) {
        return next(ApiError.badRequest('Wrong data')) 
    }
    const userId = req.user.id
  
   
    try {
      await sequelize.transaction(async (SequelizeTransaction)=>{

    const oldTransaction = await Transaction.findOne({where:{id:transactionId,userId}}, { SequelizeTransaction })
    const walletId = oldTransaction.walletId
    const description = oldTransaction.description
    const categoryId = oldTransaction.categoryId
    const oldSum = oldTransaction.sum
         
   
    let update
    if(newSum && newDescription) {
     update = {
      sum:newSum,
      description:newDescription
    }
    }
    
    if(!newSum && newDescription) {
      update = {
      description:newDescription
    }
    const updatedTransaction = await Transaction.update(update,{where:{id:transactionId,userId},transaction:SequelizeTransaction })
    return res.json(updatedTransaction)
    }
    
    if(newSum && !newDescription) {
       update = {
      sum:newSum
    }
    }

        const updatedTransaction = await Transaction.update(update,{where:{id:transactionId,userId},transaction:SequelizeTransaction })
   
        const category = await Category.findOne({where:{id:categoryId,userId}}, { SequelizeTransaction })
       
        const categoryNewSum = (category.spent - oldSum)+ newSum
        const categoryUpdate = {
            spent: categoryNewSum
        }
      await Category.update(categoryUpdate,{where:{id:categoryId,userId,userId},  transaction:SequelizeTransaction })

        if(walletId !== -1) 
      {
        const wallet = await Wallet.findOne({where:{userId,id:walletId}})
      const walletSpent = (parseFloat(wallet.balance) + parseFloat(oldSum)) - parseFloat(newSum)
    const walletUpdate = {
      balance:walletSpent
  }
    await Wallet.update(walletUpdate,{where:{userId,id:walletId},  transaction:SequelizeTransaction })
  }
      return res.json(updatedTransaction)
      
  })
  }catch(e){
       
        return next(ApiError.badRequest('Wrong data'))
       
    }
   }



async delete(req,res,next) {
 
  const {transactionId} = req.body 
  if( !transactionId) {
      return next(ApiError.badRequest('Wrong data')) 
  }
  const userId = req.user.id
  try {
    await sequelize.transaction(async (SequelizeTransaction)=>{

  const oldTransaction = await Transaction.findOne({where:{id:transactionId,userId}}, { SequelizeTransaction })
  const categoryId = oldTransaction.categoryId
  const oldSum = oldTransaction.sum
  const walletId = oldTransaction.walletId
 
      const category = await Category.findOne({where:{id:categoryId,userId}}, { SequelizeTransaction })
      if(category) { 
     const categoryNewSum = (category.spent - oldSum)
      const categoryUpdate = {
          spent: categoryNewSum
      }
   
    await Category.update(categoryUpdate,{where:{id:categoryId,userId},  transaction:SequelizeTransaction })
   }
    if(walletId !== -1) {
    const wallet = await Wallet.findOne({where:{userId,id:walletId}})
      const walletSpent = parseFloat(wallet.balance) + parseFloat(oldSum)
  
    const walletUpdate = {
      balance:walletSpent
  }

    await Wallet.update(walletUpdate,{where:{userId,id:walletId},  transaction:SequelizeTransaction })
  }
    const deletedTransaction = await Transaction.destroy({where:{id:transactionId,categoryId}})
      return res.json(deletedTransaction)
})
}catch(e){
     
      return next(ApiError.badRequest('Wrong data'))
     
  } 
}


}

module.exports = new TransactionController()