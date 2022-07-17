import {makeAutoObservable} from "mobx";

export default class WalletStore {
    constructor() {
        this._wallets = [
            {id: 1, name: 'Card', balance: 10000, currency: "USD"},
            {id: 2, name: 'Cash', balance: 10000, currency: "USD"},
            {id: 3, name: 'Crypto', balance: 10000, currency: "USDT"}
        ]
        
        this._selectedWallet = this._wallets[0]
        makeAutoObservable(this)
    }

    setWallets(wallets) {
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