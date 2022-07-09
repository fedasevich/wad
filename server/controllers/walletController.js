const ApiError = require('../error/ApiError')
const sequelize = require('../db')
const { Wallet} = require('../models/models')


class WalletController {
    
    async create(req,res,next) {
    const {name,userId,currency}=req.body
    if(!name||!userId||!currency){
    next(ApiError.badRequest('Wrong data'))
    }
    const wallet = await Wallet.create({name,userId,currency})
    return res.json(wallet)
    }
    
    
    async get(req,res,next) {
        const {userId} = req.body
        if(!userId || req.user.id !== userId){
            return next(ApiError.badRequest('Wrong data'))
        }
        const wallet = await Wallet.findAll({where:{userId}})
        return res.json(wallet)
    }
    
    async change(req,res,next) {
    const {userId ,walletId, currency, name, balance} = req.body
    if(!userId || !walletId ||!balance || req.user.id !== walletId) {
        return next(ApiError.badRequest('Wrong data'))
    }
    let SequelizeTransaction
    try {
    SequelizeTransaction = await sequelize.transaction()
const oldWallet = await Wallet.findOne({where:{id:walletId, userId}}, { SequelizeTransaction })
const newBalance = balance || oldWallet.balance
const newCurrency = currency || oldWallet.currency
const newName = name || oldWallet.name

        const update = {
            balance: newBalance,
            currency: newCurrency,
            name: newName
        }
        
        const updatedWallet = await Wallet.update(update,{where:{id:walletId,userId}}, { SequelizeTransaction })
       
            const wallet =  await Wallet.findOne({where:{id:walletId, userId}}, { SequelizeTransaction })
            return res.json(wallet)

    
    }catch(e){
        if(SequelizeTransaction){
            await SequelizeTransaction.rollback()
        }
        return next(ApiError.badRequest(e))
       
    }
    }

async delete(req,res,next) {
    const {userId,walletId} = req.body
if(!userId || !walletId || req.user.id !== userId) {
    return next(ApiError.badRequest('Wrong data'))
}
const deletedWallet = await Wallet.destroy({where:{userId,id:walletId}})
res.json(deletedWallet)
}



}
    
    module.exports = new WalletController()