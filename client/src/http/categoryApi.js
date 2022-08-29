import {$authHost} from "./index"


export const createCategory = async (name,iconId) => {
   
    const {data} = await $authHost.post('api/category',{name,iconId})
    return data
}

export const fetchCategory = async () => {
   
    const {data} = await $authHost.get('api/category')
   
    return data
}


export const fetchCategoryPeriod = async (fromDate,toDate) => {
    const {data} = await $authHost.get('api/transaction',{params: {
        fromDate,toDate
    }})
    return data
}

export const changeCategory = async (categoryId,newSpent,newName,newIconId) => {
    const {data} = await $authHost.put('api/category',{categoryId,newName,newSpent,newIconId})
    return data
}


export const resetAllCategories = async () => {
    const newSpent = 0
    const {data} = await $authHost.put('api/category',{newSpent})
    return data
}

export const deleteCategory = async (categoryId) => {
    const {data} = await $authHost.delete('api/category',{data: { categoryId}})
    return data
}