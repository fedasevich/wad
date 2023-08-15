import { $authHost, } from "./index"



export const createTransaction = async (categoryId, walletId, description, sum) => {
    const { data } = await $authHost.post('api/transaction', { categoryId, walletId, description, sum })
    return data
}

export const fetchTransaction = async (page, limit, sort) => {
    const { data } = await $authHost.get('api/transaction', {
        params: {
            limit, page, sort
        }
    })
    return data
}


export const fetchWalletTransactionByWalletId = async (page, limit, sort, walletId) => {
    const { data } = await $authHost.get('api/transaction', {
        params: {
            limit, page, sort, walletId
        }
    })
    return data
}

export const changeTransaction = async (transactionId, newSum, newDescription) => {
    const { data } = await $authHost.put(`api/transaction/${transactionId}`, { newSum, newDescription })
    return data
}


export const deleteTransaction = async (transactionId) => {
    const { data } = await $authHost.delete(`api/transaction/${transactionId}`)
    return data
}