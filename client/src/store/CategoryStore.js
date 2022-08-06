import {makeAutoObservable} from "mobx";

export default class CategoryStore {
    constructor() {
        this._categories = [

        ]
        this._transactions = [
           
        ]
        this._transactionsLimit = 5
        this._transactionsPage = 1

        this._selectedCategory = {}
        this._selectedTransaction = {}
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

    setSelectedTransaction(transaction) {
        this._selectedTransaction = transaction
    }

    setTransactionsLimit(limit) {
        this._transactionsLimit = limit
    }

    setTransactionsPage(page) {
        this._transactionsPage = page
    }

    get categories() {
        return this._categories
    }

    get selectedTransaction() {
        return this._selectedTransaction
    }
    get transactions() {
        return this._transactions
    }

    get selectedCategory() {
        return this._selectedCategory
    }

    get transactionsPage() {
        return this._transactionsPage
    }

    get transactionsLimit() {
        return this._transactionsLimit
    }

}