import {$authHost, $host} from "./index"
import jwt_decode from "jwt-decode"

export const createTransaction = async (email,password) => {
    const{data} = await $host.post('api/transaction',{email,password})
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