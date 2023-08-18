import { createContext, useContext } from 'react';
import { fetchCategory } from '../http/categoryApi';
import { fetchWallet } from '../http/walletApi';
import CategoryStore from './CategoryStore';
import UserSettingsStore from './UserSettingsStore';
import UserStore from './UserStore';
import WalletStore from './WalletStore';

export class RootStore {
  constructor() {
    this.userSettings = new UserSettingsStore(this);
    this.user = new UserStore(this);
    this.category = new CategoryStore(this);
    this.wallet = new WalletStore(this);
  }

  async initializeCategoriesAndWallets() {
    const [categoryData, walletData] = await Promise.all([fetchCategory(), fetchWallet()]);
    this.category.setCategories(categoryData);
    this.wallet.setWallet(walletData);
  }
}

const rootStoreInstance = new RootStore();

export const StoreContext = createContext({
  user: rootStoreInstance.user,
  category: rootStoreInstance.category,
  wallet: rootStoreInstance.wallet,
  userSettings: rootStoreInstance.userSettings,
  rootStore: rootStoreInstance
});

export const useStore = () => useContext(StoreContext);
