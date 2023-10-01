import { makeAutoObservable, runInAction } from 'mobx';
import toast from 'react-hot-toast';
import { changeCurrencyId } from '../http/userApi';

export default class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this._isAuth = false;
    this._user = {};

    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get currencyId() {
    return this._user.currencyId;
  }

  changeCurrencyId(currencyId, newCurrencyRate, convert) {
    try {
      return changeCurrencyId(currencyId, newCurrencyRate, convert).then((data) => {
        runInAction(() => {
          this._user = data.user;
          this.rootStore.currency.setExchangeRates(data.exchangeRates);
          this.rootStore.currency.setUserCurrency();

          if (convert) {
            this.rootStore.wallet.setWallet(data.updatedWallets);
          }
        });
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  logOut() {
    this._isAuth = false;
    this._user = {};
    localStorage.removeItem('token');
  }
}
