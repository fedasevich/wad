import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-hot-toast';
import { changeWallet, createWallet, deleteWallet, transferWallet } from '../http/walletApi';

export default class WalletStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this._wallets = [];

    this._selectedWallet = {};
    makeAutoObservable(this);
  }

  setWallet(wallets) {
    this._wallets = wallets;
  }

  setSelectedWallet(wallet) {
    this._selectedWallet = wallet;
  }

  get wallets() {
    return this._wallets;
  }

  get selectedWallet() {
    return this._selectedWallet;
  }

  getWalletById(id) {
    return this.wallets.find((wallet) => wallet.id === id);
  }

  editWallet(id, newName, newBalance) {
    if (!newName && !newBalance) {
      return toast.error(`Not enough data`);
    }
    const parsedNewBalance = parseFloat(newBalance);
    try {
      changeWallet(id, newName || null, newBalance ? parsedNewBalance : null).then(() => {
        runInAction(() => {
          const wallet = this.wallets.find((wallet) => wallet.id === id);
          if (newName) {
            wallet.name = newName;
          }
          if (newBalance) {
            wallet.balance = parsedNewBalance;
          }
        });
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  createWallet(createWalletName) {
    if (!createWalletName) {
      return toast.error("Inputs can't be empty");
    }

    try {
      createWallet(createWalletName).then((data) => {
        runInAction(() => {
          this.wallets.push(data);
        });
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  deleteWallet(id) {
    try {
      runInAction(() => {
        deleteWallet(id).then(() => {
          const walletIndex = this.wallets.findIndex((wallet) => wallet.id === id);
          this.wallets.splice(walletIndex, 1);
        });
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  static transferWallet(fromSelectedWallet, toSelectedWallet, transferAmount) {
    const { id: fromWalletId } = fromSelectedWallet;
    const { id: toWalletId } = toSelectedWallet;

    if (!transferAmount) {
      return toast.error('Please provide amount.');
    }

    if (fromWalletId === toWalletId) {
      return toast.error("Cant't transfer to same wallet.");
    }

    try {
      transferWallet(fromWalletId, toWalletId, transferAmount).then(() => {
        runInAction(() => {
          Object.assign(fromSelectedWallet, { balance: fromSelectedWallet.balance - transferAmount });
          Object.assign(toSelectedWallet, { balance: toSelectedWallet.balance + transferAmount });
        });
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }
}
