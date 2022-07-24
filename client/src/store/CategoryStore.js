import {makeAutoObservable} from "mobx";

export default class CategoryStore {
    constructor() {
        this._categories = [

        ]
        this._transactions = [
           
        ]
        this._selectedCategory = {}
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }

    setTransactions(transactions) {
        this._transactions = transactions
    }

    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    get categories() {
        return this._categories
    }

    get transactions() {
        return this._transactions
    }

    get selectedCategory() {
        return this._selectedCategory
    }

}