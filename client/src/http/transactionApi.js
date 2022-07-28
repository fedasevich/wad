import {$authHost, $host} from "./index"
import jwt_decode from "jwt-decode"


export const createTransaction = async (categoryId,walletId,description,sum) => { 
    const{data} = await $authHost.post('api/transaction',{categoryId,walletId,description,sum})
    return data
}

export const fetchTransaction = async () => {
    const {data} = await $authHost.get('api/transaction',{params: {
        limit:100
    }})
    return data
}

export const changeTransaction = async () => {
    const {data} = await $authHost.get('api/transaction')
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}