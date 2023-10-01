import { format } from 'date-fns';
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export default class CurrencyStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this._exchangeRates = [];
    this._userCurrency = {};
    this._exchangeRatesDate = '';

    makeAutoObservable(this);
    makePersistable(
      this,
      {
        name: 'currencies',
        properties: ['_exchangeRates', '_exchangeRatesDate'],
        storage: window.localStorage
      },
      { fireImmediately: true }
    );
  }

  get userCurrency() {
    return this._userCurrency;
  }

  get exchangeRatesDate() {
    return this._exchangeRatesDate;
  }

  setUserCurrency() {
    this._userCurrency = this.exchangeRates.find((exchangeRate) => exchangeRate.id === this.rootStore.user.currencyId);
  }

  setExchangeRates(exchangeRates) {
    this._exchangeRatesDate = format(new Date(), 'dd.MM.yyyy');
    this._exchangeRates = exchangeRates;
  }

  get exchangeRates() {
    return this._exchangeRates;
  }
}
