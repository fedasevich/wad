import {makeAutoObservable, runInAction} from "mobx";

import { createTransaction, deleteTransaction } from "../http/transactionApi";


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

    createTransaction(currentOperand,selectedCategory,selectedWallet,description,wallet) {
           try {
        createTransaction(selectedCategory.id,selectedWallet.id, description ?  description:selectedCategory.name , parseFloat(currentOperand)).
        then(data=> {
            runInAction(()=>{
        this.transactions.unshift(data)
        selectedWallet.balance -= parseFloat(currentOperand)
        selectedCategory.spent += parseFloat(currentOperand)
        })
    })
      } catch(e) {
        alert(e.response.data.message);
      }
    }

    deleteTransaction(transactionId,categoryId,walletId,wallet) {    
        try {
            deleteTransaction(transactionId).
            then(()=> {
                runInAction(()=>{
                const transaction =  this.getTransactionById(transactionId)
                const category= this.getCategoryById(categoryId)
                if(walletId !== -1) 
               {
                 const foundWallet = wallet.getWalletById(walletId)
                 foundWallet.balance += parseFloat(transaction.sum)
              }
                category.spent -= parseFloat(transaction.sum)
                this.transactions.splice(this.transactions.indexOf(transaction),1)
                  }) 
            })
          } catch(e) {
            alert(e.response.data.message);
          }
    }

    getTransactionById=(id)=>{
        return this.transactions.find((transaction)=> transaction.id === id)
    }

    getCategoryById=(id) => {
        if(id==-1) return this.categories[0]
        return this.categories.find((category)=> category.id === id)
    }

    getIconIdFromCategoryById =(id)=> {
        const findCategory = this.getCategoryById(id)
        return findCategory?.iconId
      }

}