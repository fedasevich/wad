const ApiError = require('../error/ApiError')
const sequelize = require('../db')
const { Wallet} = require('../models/models')


class WalletController {
    
    async create(req,res,next) {
    const {name,currency}=req.body
    const userId = req.user.id
    if(!name||!currency){
    next(ApiError.badRequest('Wrong data'))
    }
    const wallet = await Wallet.create({name,userId,currency})
    return res.json(wallet)
    }
    
    
    async get(req,res,next) {
        
        if(!req.user.id ){
            return next(ApiError.badRequest('Wrong data'))
        }
        const userId = req.user.id
        const wallet = await Wallet.findAll({where:{userId}})
        return res.json(wallet)
    }
    
    async change(req,res,next) {
    let {walletId, newCurrency, newName, newBalance} = req.body
    if( !walletId || !newBalance && newCurrency && newName  ) {
        return next(ApiError.badRequest('Wrong data'))
    }
    const userId = req.user.id
    let SequelizeTransaction
    try {
    SequelizeTransaction = await sequelize.transaction()
const oldWallet = await Wallet.findOne({where:{id:walletId, userId}}, { SequelizeTransaction })

 newBalance = newBalance || oldWallet.balance
 newCurrency = newCurrency || oldWallet.currency
newName = newName || oldWallet.name

        const update = {
            balance: newBalance,
            currency: newCurrency,
            name: newName
        }
        
        const updatedWallet = await Wallet.update(update,{where:{id:walletId,userId}}, { SequelizeTransaction })
       
            const wallet =  await Wallet.findOne({where:{id:walletId, userId}}, { SequelizeTransaction })
            await SequelizeTransaction.commit()
            return res.json(wallet)

    
    }catch(e){
        if(SequelizeTransaction){
            await SequelizeTransaction.rollback()
        }
        return next(ApiError.badRequest('Wrong data'))
       
    }
    }

async delete(req,res,next) {
    const {walletId} = req.body
if(!walletId ) {
    return next(ApiError.badRequest('Wrong data'))
}
const userId = req.user.id
let SequelizeTransaction
    try {
    SequelizeTransaction = await sequelize.transaction()
const deletedWallet = await Wallet.destroy({where:{userId,id:walletId}})
await SequelizeTransaction.commit()
res.json(deletedWallet)
}catch(e){
    if(SequelizeTransaction){
        await SequelizeTransaction.rollback()
    }
    return next(ApiError.badRequest("Wrong data"))
   
}
}


}
    
    module.exports = new WalletController()