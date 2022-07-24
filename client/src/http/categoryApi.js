import {$authHost, $host} from "./index"
import jwt_decode from "jwt-decode"

export const createCategory = async (email,password) => {
   
    const{data} = await $host.post('api/user/registration',{email,password})
    return data
}

export const fetchCategory = async () => {
   
    const {data} = await $authHost.get('api/category')
   
    return data
}

export const changeCategory = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}