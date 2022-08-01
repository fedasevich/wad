import {$authHost, $host} from "./index"
import jwt_decode from "jwt-decode"

export const createCategory = async (name) => {
   
    const {data} = await $authHost.post('api/category',{name})
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


export const resetAllCategories = async () => {
    const newSpent = 0
    const {data} = await $authHost.put('api/category',{newSpent})
    return data
}