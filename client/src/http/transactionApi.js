import {$authHost, $host} from "./index"
import jwt_decode from "jwt-decode"


export const createTransaction = async (categoryId,walletId,description,sum) => { 
    const limit = 3
    const page = 2
    const{data} = await $authHost.post('api/transaction',{categoryId,walletId,description,sum,limit,page})
    return data
}

export const fetchTransaction = async () => {
    const {data} = await $authHost.get('api/transaction')
    return data
}

export const changeTransaction = async () => {
    const {data} = await $authHost.get('api/transaction')
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}