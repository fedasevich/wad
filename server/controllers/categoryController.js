const sequelize=require('../db')
const ApiError = require('../error/ApiError')

const {Category, Transaction} = require('../models/models')

class CategoryController {
    async create(req,res,next) {
    const {name,iconId} = req.body
    const userId = req.user.id
    if(!name || !iconId){
        return next(ApiError.badRequest('Wrong data'))
    }
    const category = await Category.create({name,userId,iconId})
    return res.json(category)
    }
    
    async get(req,res,next) {
       
        if( !req.user.id ){
            return next(ApiError.badRequest('Wrong data'))
        }
        const userId = req.user.id
        const category = await Category.findAll({where:{userId},
            order: [
             ['id', "ASC"]
           ]})
        return res.json(category)
    }
    
    async change(req,res,next) {
        const {categoryId,newName,newSpent,newIconId} = req.body
        if(newSpent !== null  && !newName && !newIconId|| !categoryId){
            return next(ApiError.badRequest('Not enough data'))
        }
        const userId = req.user.id
        
        let update= {}
        if(newName) update["name"] = newName
        if(newSpent!== null) update["spent"] = newSpent
        if(newIconId) update["iconId"] = newIconId
    
  
        let transaction
        try {
        transaction = await sequelize.transaction()
           const category = await Category.update(update,{where:{id:categoryId,userId},  transaction })
          
           const updatedCategory = await Category.findOne({where:{id:categoryId,userId},  transaction })
  
        await transaction.commit()
        
        return res.json(updatedCategory)
    }catch(e){
        if(transaction){
            await transaction.rollback()
        }
        return next(ApiError.badRequest('Wrong data'))
       
    }
        
    }
    
    async delete(req,res,next) {
        const {categoryId} = req.body
     
    if(!categoryId ) {
        return next(ApiError.badRequest('Wrong data'))
    }
    const update = {
        categoryId: -1
    }
    const userId = req.user.id

    await Transaction.update(update,{where:{categoryId,userId}})
    

    try {
        await sequelize.transaction(async (SequelizeTransaction)=>{

    const deletedCategory = await Category.destroy({where:{userId,id:categoryId}})
   
    return res.json(deletedCategory)
   
})
}catch(e){

    return next(ApiError.badRequest(e))
   
}
    }

    }
    
    module.exports = new CategoryController()

   