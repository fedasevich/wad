import { isSameDay, parse } from 'date-fns';
import { runInAction } from 'mobx';
import { createContext, useContext } from 'react';
import { fetchCategory } from '../http/categoryApi';
import { fetchExchangeRates } from '../http/currencyApi';
import { fetchWallet } from '../http/walletApi';
import CategoryStore from './CategoryStore';
import CurrencyStore from './CurrencyStore';
import UserSettingsStore from './UserSettingsStore';
import UserStore from './UserStore';
import WalletStore from './WalletStore';

export class RootStore {
  constructor() {
    this.userSettings = new UserSettingsStore(this);
    this.user = new UserStore(this);
    this.category = new CategoryStore(this);
    this.wallet = new WalletStore(this);
    this.currency = new CurrencyStore(this);
  }

  async initializeCategoriesAndWallets() {
    const [categoryData, walletData] = await Promise.all([fetchCategory(), fetchWallet()]);
    this.category.setCategories(categoryData);
    this.wallet.setWallet(walletData);

    if (
      !this.currency.exchangeRates.length ||
      !isSameDay(new Date(), parse(this.currency.exchangeRatesDate, 'dd.MM.yyyy', new Date()))
    ) {
      const exchangeRates = await fetchExchangeRates();
      this.currency.setExchangeRates(exchangeRates);
    }

    runInAction(() => {
      this.currency.setUserCurrency();
    });
  }
}

const rootStoreInstance = new RootStore();

export const StoreContext = createContext({
  user: rootStoreInstance.user,
  category: rootStoreInstance.category,
  wallet: rootStoreInstance.wallet,
  userSettings: rootStoreInstance.userSettings,
  rootStore: rootStoreInstance,
  currency: rootStoreInstance.currency
});

export const useStore = () => useContext(StoreContext);
