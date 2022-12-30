import {makeAutoObservable, runInAction} from "mobx";

import { deleteTransaction } from "../http/transactionApi";


export default class CategoryStore {
    constructor() {
        this._categories = [

        ]
        this._transactions = [
           
        ]
        this._transactionsLimit = 5
        this._transactionsPage = 1
        this._transactionsSort = "DESC"
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

    setTransactionsSort(sort) {
        this._transactionsSort = sort
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

    get transactionsSort() {
        return this._transactionsSort
    }

    deleteTransaction(id,categoryId,walletId,wallet) {
        try {
            deleteTransaction(id).
            then(()=> {
                runInAction(()=>{
                    const transactionIndex =  this.transactions.findIndex(transaction => transaction.id === id)
                console.log(categoryId)
                    const categoryIndex = this.categories.findIndex(category =>category.id === categoryId)
                    console.log(categoryIndex)
                    if(walletId !== -1) 
                   {
                     const walletIndex = wallet.wallets.findIndex(wallet => wallet.id === walletId)
                    wallet.wallets[walletIndex].balance += parseFloat(this.transactions[transactionIndex].sum)
                  }
                    this.categories[categoryIndex].spent -= parseFloat(this.transactions[transactionIndex].sum)
                 
                    this.transactions.splice(transactionIndex, 1)
        
        
                  }) 
             
            })
          } catch(e) {
            alert(e.response.data.message);
          }
       
    }

    getIconIdFromCategoryById =(id)=> {
        let findCategory = this.categories.find((category)=> category.id === id)
        return findCategory?.iconId
      }

}