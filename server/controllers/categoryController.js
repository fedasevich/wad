const sequelize=require('../db')
const ApiError = require('../error/ApiError')

const {Category} = require('../models/models')

class CategoryController {
    async create(req,res,next) {
    const {name} = req.body
    const userId = req.user.id
    if(!name){
        return next(ApiError.badRequest('Wrong data'))
    }
    const category = await Category.create({name,userId})
    return res.json(category)
    }
    
    async get(req,res,next) {
       
        if( !req.user.id ){
            return next(ApiError.badRequest('Wrong data'))
        }
        const userId = req.user.id
        const category = await Category.findAll({where:{userId}})
        return res.json(category)
    }
    
    async change(req,res,next) {
        const {categoryId,newName,newSpent} = req.body
        if(!newSpent && !newName || !categoryId){
            return next(ApiError.badRequest('Not enough data'))
        }
        const userId = req.user.id
        let update
        if(newName && newSpent) {
            update = {
                name:newName,
                spent:newSpent
            } 
        }
        if(!newName && newSpent) {
            update = {
                spent:newSpent
            } 
        }
        if(newName && !newSpent) {
            update = {
                name:newName
            } 
        }
  
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
        const {userId,categoryId} = req.body
    if(!userId || !categoryId || req.user.id !== userId) {
        return next(ApiError.badRequest('Wrong data'))
    }
    const deletedCategory = await Category.destroy({where:{userId,id:categoryId}})
    res.json(deletedCategory)
    }

    }
    
    module.exports = new CategoryController()

   