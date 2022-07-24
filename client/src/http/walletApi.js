import {$authHost, $host} from "./index"
import jwt_decode from "jwt-decode"

export const createWallet = async (email,password) => {
    const{data} = await $host.post('api/user/registration',{email,password})
    return data
}

export const fetchWallet = async () => {
    const {data} = await $authHost.get('api/wallet')
    return data
}

export const changeWallet = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}