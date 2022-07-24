import {makeAutoObservable} from "mobx";

export default class CategoryStore {
    constructor() {
        this._categories = [

        ]
        this._transactions = [
            {id: 1, categoryName: 'Groceries', sum: 10,categoryId:1},
            {id: 2, categoryName: 'Groceries', sum: 100,categoryId:1},
            {id: 3, categoryName: 'Groceries', sum: 500,categoryId:1},
            {id: 4, categoryName: 'Oil', sum: 10,categoryId:2},
            {id: 5, categoryName: 'Oil', sum: 100,categoryId:2},
            {id: 6, categoryName: 'Oil', sum: 500,categoryId:2},
            {id: 7, categoryName: 'Health', sum: 10,categoryId:3},
            {id: 8, categoryName: 'Health', sum: 100,categoryId:3},
            {id: 9, categoryName: 'Health', sum: 500,categoryId:3}
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