import {$authHost, $host} from "./index"

export const registration = async (email,password) => {
    const response = await $host.post('api/user/registration',{email,password})
    return response
}

export const login = async (email,password) => {
    const response = await $host.post('api/user/login',{email,password})
    return response
}

export const check = async () => {
    const response = await $host.post('api/user/check')
    return response
}