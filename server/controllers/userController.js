const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Category,Wallet} = require('../models/models')

async function createAllCategories(id) {
const category =[ 
await Category.create({name: "Groceries",userId: id}),
await Category.create({name: "Gifts",userId: id}),
await Category.create({name: "Transport",userId: id}),
await Category.create({name: "Health",userId: id}),
await Category.create({name: "Leisure",userId: id}),
await Category.create({name: "Shopping",userId: id}),
await Category.create({name: "Family",userId: id}),
]
}

async function createAllWallets(id) {
    const wallets = [ 
        await Wallet.create({name:"Cash",userId:id,currency:"USD"}),
        await Wallet.create({name:"Card",userId:id,currency:"USD"}), 
    ]
}

const generateJWT= (id,email,subscriber) => {
    return jwt.sign({id:id, email, subscriber},process.env.SECRET_KEY,{expiresIn:'24h'})
    
}

class UserController {
    async registration(req,res,next) {
    const {email,password}= req.body
    if(!email || !password) {
        return next(ApiError.badRequest('Wrong email or password'))
    }
    const candidate = await User.findOne({where:{email}})
    if(candidate){
        return next(ApiError.badRequest('User with this email already exists'))
    }
    const hashPassword = await bcrypt.hash(password,5)
    const user = await User.create({email,password: hashPassword})
    const token = generateJWT(user.id,email,user.subscriber)
    createAllCategories(user.id)
    createAllWallets(user.id) 
    return res.json({token})
    }
    
    async login(req,res,next) {
        
    const {email,password} = req.body
    if(!email || !password) {
        return next(ApiError.badRequest('Wrong email or password'))
    }
    const user = await User.findOne({where:{email}})
    if(!user){
        return next(ApiError.badRequest("User doesn't exist"))
    }
    let compare = bcrypt.compareSync(password, user.password)
    if(!compare) {
        return next(ApiError.badRequest("Wrong password"))   
    }
    const token = generateJWT(user.id,user.email,user.subscriber)
    return res.json({token})
    }
    
    async check(req,res,next) {
        const token = generateJWT(req.user.id, req.user.email,req.user.subscriber)
        return res.json({token})
       
    }
    
    async change(req,res,next) {

    }
    
    }
    
    module.exports = new UserController()