import { makeAutoObservable, runInAction } from 'mobx';
import { clearPersistedStore, makePersistable, pausePersisting, startPersisting } from 'mobx-persist-store';
import { toast } from 'react-hot-toast';
import {
  changeCategory,
  createCategory,
  deleteCategory,
  fetchCategory,
  fetchCategoryPeriod
} from '../http/categoryApi';

import { changeTransaction, createTransaction, deleteTransaction } from '../http/transactionApi';

export default class CategoryStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this._categories = [];
    this._parsedCategories = [];
    this._transactions = [];
    this._transactionsLimit = 5;
    this._transactionsPage = 1;
    this._transactionsSort = 'DESC';
    this._selectedCategory = {};
    this._selectedTransaction = {};

    makeAutoObservable(this);
    makePersistable(
      this,
      {
        name: 'transaction',
        properties: ['_transactionsSort', '_transactionsLimit', '_transactionsPage'],
        storage: window.localStorage
      },
      { fireImmediately: true }
    );
  }

  setCategories(categories) {
    this._categories = categories;
  }

  setParsedCategories(parsedCategories) {
    this._parsedCategories = parsedCategories;
  }

  setTransactions(transactions) {
    this._transactions = transactions;
  }

  setSelectedCategory(category) {
    this._selectedCategory = category;
  }

  setSelectedTransaction(transaction) {
    this._selectedTransaction = transaction;
  }

  setTransactionsLimit(limit) {
    this._transactionsLimit = limit;
  }

  setTransactionsPage(page) {
    this._transactionsPage = page;
  }

  setTransactionsSort(sort) {
    this._transactionsSort = sort;
  }

  clearPersistence() {
    clearPersistedStore(this);
  }

  modifyTransactionsFilter({
    limit = this.transactionsLimit,
    page = this.transactionsPage,
    sort = this.transactionsSort
  }) {
    if (this.rootStore.userSettings.persistTransactionFilter) {
      startPersisting(this);
    } else {
      pausePersisting(this);
    }

    this.setTransactionsLimit(limit);
    this.setTransactionsPage(page);
    this.setTransactionsSort(sort);
  }

  get categories() {
    return this._categories;
  }

  get parsedCategories() {
    return this._parsedCategories;
  }

  get selectedTransaction() {
    return this._selectedTransaction;
  }

  get transactions() {
    return this._transactions;
  }

  get selectedCategory() {
    return this._selectedCategory;
  }

  get transactionsPage() {
    return this._transactionsPage;
  }

  get transactionsLimit() {
    return this._transactionsLimit;
  }

  get transactionsSort() {
    return this._transactionsSort;
  }

  createTransaction(currentOperand, selectedCategory, selectedWallet, description) {
    try {
      createTransaction(
        selectedCategory.id,
        selectedWallet.id,
        description || selectedCategory.name,
        currentOperand
      ).then((data) => {
        runInAction(() => {
          this.transactions.unshift(data);
          selectedWallet.balance += currentOperand;
          this.getCategoryById(selectedCategory.id).spent -= currentOperand;
        });
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  deleteTransaction(transactionId, walletId) {
    try {
      deleteTransaction(transactionId).then(() => {
        runInAction(() => {
          const transaction = this.getTransactionById(transactionId);
          const wallet = this.rootStore.wallet.getWalletById(walletId);

          if (wallet) {
            wallet.balance -= parseFloat(transaction.sum);
          }

          this.transactions.splice(this.transactions.indexOf(transaction), 1);
        });
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  getTransactionById = (id) => {
    return this.transactions.find((transaction) => transaction.id === id);
  };

  getRegularCategoryById = (id) => {
    return this.categories.find((category) => category.id === id);
  };

  getCategoryById = (id) => {
    if (id === -1) return this.parsedCategories[0];
    return this.parsedCategories.find((category) => category.id === id);
  };

  getIconIdFromCategoryById = (id) => {
    const findCategory = this.getRegularCategoryById(id);
    return findCategory?.iconId || -1;
  };

  createCategory(newCategoryName, newCategorySelectedIcon) {
    try {
      return createCategory(newCategoryName, newCategorySelectedIcon.id).then((data) => {
        runInAction(() => {
          this.categories.push(data);
          this.parsedCategories.push(data);
        });
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  changeTransaction(id, newSum, newDescription) {
    if (!newSum && !newDescription) {
      return toast.error(`Not enough data`);
    }
    const transaction = this.getTransactionById(id);
    const parsedNewSum = parseFloat(newSum);

    try {
      changeTransaction(transaction.id, parsedNewSum, newDescription).then(() => {
        runInAction(() => {
          const walletToChange = this.rootStore.wallet.getWalletById(transaction.walletId);

          if (newSum) {
            if (walletToChange) {
              walletToChange.balance = walletToChange.balance - transaction.sum + parsedNewSum;
            }

            transaction.sum = parsedNewSum;
          }

          if (newDescription) {
            transaction.description = newDescription;
          }
        });
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  changeCategory(id, editCategory) {
    if ((editCategory || !editCategory.spent) && !editCategory.name && !Object.keys(editCategory.icon).length) {
      return toast.error(`Not enough data`);
    }
    try {
      return changeCategory(id, parseFloat(editCategory.spent), editCategory.name, editCategory.icon.id).then(
        (data) => {
          runInAction(() => {
            const categoryToEdit = this.getRegularCategoryById(id);
            Object.assign(categoryToEdit, data);
          });
        }
      );
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  static fetchCategoryPeriod(dateRange) {
    if (!dateRange || !dateRange[0].startDate || !dateRange[0].endDate) return;

    const startDate = dateRange[0].startDate.toISOString();
    const endDate = dateRange[0].endDate.toISOString();

    return fetchCategoryPeriod(startDate, endDate)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  parseCategories(data) {
    runInAction(() => {
      const categorySums = data.rows.reduce((result, row) => {
        if (result[row.categoryId] === undefined) {
          result[row.categoryId] = 0;
        }
        result[row.categoryId] -= parseFloat(row.sum);
        return result;
      }, {});

      this._parsedCategories = this._categories.map((category) => ({
        ...category,
        spent: categorySums[category.id] || 0
      }));
    });
  }

  fetchCategory() {
    try {
      fetchCategory().then((data) => {
        runInAction(() => {
          this.setCategories(data);
        });
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  async deleteCategory(id) {
    try {
      await deleteCategory(id).then(() => {
        runInAction(() => {
          const categoryIndex = this._parsedCategories.findIndex((category) => category.id === id);
          this.categories.splice(categoryIndex, 1);
          this.parsedCategories.splice(categoryIndex, 1);
        });
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }
}
