import {makeAutoObservable, runInAction} from "mobx";
import { changeCategory, createCategory, deleteCategory, fetchCategory, fetchCategoryPeriod } from "../http/categoryApi";

import { changeTransaction, createTransaction, deleteTransaction } from "../http/transactionApi";


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
        if(id===-1) return this.categories[0]
        return this.categories.find((category)=> category.id === id)
    }

    getIconIdFromCategoryById =(id)=> {
        const findCategory = this.getCategoryById(id)
        return findCategory?.iconId
      }
    
    createCategory(newCategoryName,newCategorySelectedIcon) {
        try {
            createCategory(newCategoryName,newCategorySelectedIcon.id).
            then(data=> {
              runInAction(() => {
              this.categories.push(data)

              })
            })
          } catch(e) {
            alert(e.response.data.message);
          }
    }

    changeTransaction(id,newSum,newDescription,wallet) {
        if (!newSum && !newDescription) {
            return alert(`Not enough data`)
          }
          const transaction = this.getTransactionById(id)
          try {
            changeTransaction(transaction.id, parseFloat(newSum), newDescription).
              then(() => {
                runInAction(() => {
                    const categoryToChange = this.getCategoryById(transaction.categoryId)
                    const walletToChange = wallet.getWalletById(transaction.walletId)
                  if (newSum) {
                    if (transaction.walletId !== -1) {
                        walletToChange.balance = (parseFloat(walletToChange.balance) + parseFloat(transaction.sum)) - parseFloat(newSum)
                    }
                    if(categoryToChange.id !==-1) {
                        categoryToChange.spent = (parseFloat(categoryToChange.spent) - parseFloat(transaction.sum)) + parseFloat(newSum)
                    }
                    transaction.sum = newSum
                  }
                  if (newDescription) {
                    categoryToChange.description = newDescription
                    transaction.description = newDescription
                  }
                })
              })
          } catch (e) {
            alert(e.response.data.message);
          }
    }

    changeCategory(id, editCategory) {
        if (!editCategory || !editCategory.spent && !editCategory.name && !Object.keys(editCategory.icon).length) {
            return alert(`Not enough data`)
          }
         console.log(editCategory)
          try {
            changeCategory(id, parseFloat(editCategory.spent), editCategory.name, editCategory.icon.id).
              then(() => {
      
               
                runInAction(() => {
                  const categoryToEdit = this.getCategoryById(id)
                  if(editCategory.name) categoryToEdit.name = editCategory.name
                  if(editCategory.spent) categoryToEdit.spent = editCategory.spent
                  if(editCategory.icon.id) categoryToEdit.iconId = editCategory.icon.id
            
                })
               
              })
          } catch (e) {
            alert(e.response.data.message);
          }
    }

    fetchCategoryPeriod(dateRange) {
      if(!dateRange || !dateRange[0].startDate || !dateRange[0].endDate) return
      try {

        fetchCategoryPeriod(dateRange[0].startDate.toISOString(), dateRange[0].endDate.toISOString()).then(data => {

          if (!data) {
            return
          }
          runInAction(() => {
            this.categories.forEach(categoryMap => {
              categoryMap.spent = 0;
            })
            data.rows.forEach(dataMap => {
              this.categories.map(categoryMap => {

                if (dataMap.categoryId === categoryMap.id) {
                  categoryMap.spent += parseFloat(dataMap.sum)
                }
              }
              )
            })
          })
        })

      } catch (e) {
        alert(e.response.data.message);
      }
    }

    fetchCategory() {
      try {
        fetchCategory().then(data => {
          runInAction(() => {
          this.setCategories(data)
        })
      })
      } catch (e) {
        alert(e.response.data.message);
      }
    }
  

    deleteCategory(id) {
      try {
        deleteCategory(id).
        then(() => {
          runInAction(() => {
            const categoryIndex = this.categories.findIndex(category => category.id === id)
            this.categories.splice(categoryIndex, 1)
          })

        })
      } catch (e) {
        alert(e.response.data.message);
      }
    }

}