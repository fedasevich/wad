import { mockCategories, mockParsedCategories, mockTransactions, mockWallet1, mockWallets } from '../../../setupTests';
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
    parseCategories: () => mockParsedCategories,
    getCategoryById: () => mockCategories[0],
    getIconIdFromCategoryById: () => mockCategories[0].iconId,
    transactions: mockTransactions
  }
};

export const useStore = () => mockStore;
