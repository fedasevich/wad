import { makeAutoObservable, runInAction } from "mobx";
import { changeWallet, createWallet, deleteWallet } from "../http/walletApi";

export default class WalletStore {
  constructor() {
    this._wallets = []

    this._selectedWallet = {}
    makeAutoObservable(this)
  }

  setWallet(wallets) {
    this._wallets = wallets
  }

  setSelectedWallet(wallet) {
    this._selectedWallet = wallet
  }

  get wallets() {
    return this._wallets
  }


  get selectedWallet() {
    return this._selectedWallet
  }


  getWalletById(id) {
    if(id==-1) return this.wallets[0]
    return this.wallets.find(wallet => wallet.id === id)
  }



  editWallet(id, newCurrency, newName, newBalance) {
    if (!newCurrency && !newName && !newBalance) {
      return alert(`Not enough data`)
    }
    try {
      changeWallet(id, newName ? newName : null, newBalance ? parseFloat(newBalance) : null, newCurrency ? parseFloat(newCurrency) : null).
        then(() => {
          runInAction(() => {
            const wallet = this.wallets.find(wallet => wallet.id === id)
            if (newName) {
              wallet.name = newName
            }
            if (newBalance) {
              wallet.balance = newBalance
            }
            if (newCurrency) {
              wallet.currency = newCurrency
            }

          })

        })
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  createWallet(createWalletCurrency, createWalletName) {
    if (!createWalletName || !createWalletCurrency) {
      return alert("Inputs can't be empty")
    }

    try {
      createWallet(createWalletName, createWalletCurrency).
        then(data => {
          this.wallets.push(data)

        })
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  deleteWallet(id) {
    try {
      runInAction(() => {
      deleteWallet(id).then(() => {   
        const walletIndex = this.wallets.findIndex(wallet => wallet.id === id)
        this.wallets.splice(walletIndex, 1)
    })

  })
 
    }catch(e) {
      alert(e.response.data.message);
    }
  }


  getCurrencyFromWalletById=(id)=> {
    const wallet = this.getWalletById(id)
    return wallet?.currency
  } 

}   
