import { mockCategories, mockCategory1, mockTransactions, mockWallet1, mockWallets } from '../../../setupTests';
import { MAIN_ROUTE } from '../../utils/constants';

const mockStore = {
  user: {
    setUser: jest.fn(),
    setIsAuth: jest.fn()
  },
  rootStore: {
    initializeCategoriesAndWallets: jest.fn()
  },
  userSettings: {
    startPage: MAIN_ROUTE
  },
  wallet: {
    wallets: mockWallets,
    createWallet: jest.fn(),
    editWallet: jest.fn(),
    getWalletById: () => mockWallet1
  },
  category: {
    parsedCategories: mockCategories,
    categories: mockCategories,
    parseCategories: jest.fn(),
    getCategoryById: () => mockCategory1,
    transactions: mockTransactions
  }
};

export const useStore = () => mockStore;
