import {makeAutoObservable} from "mobx";

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
}