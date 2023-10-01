import {
  mockCategories,
  mockExchangeRates,
  mockExchangeRatesDate,
  mockParsedCategories,
  mockTransactions,
  mockUserCurrency,
  mockWallet1,
  mockWallets
} from '../../../setupTests';
import { MAIN_ROUTE, themes } from '../../utils/constants';

const mockStore = {
  user: {
    setUser: jest.fn(),
    setIsAuth: jest.fn()
  },
  rootStore: {
    initializeCategoriesAndWallets: jest.fn()
  },
  userSettings: {
    startPage: MAIN_ROUTE,
    setCloseCalculatorOnSubmit: jest.fn(),
    setTheme: jest.fn(),
    setPersistAnalyticsChartRange: jest.fn(),
    persistTransactionFilter: false,
    setPersistTransactionFilter: jest.fn(),
    setStartPage: jest.fn(),
    changeCurrencyId: jest.fn(),
    isThemeDark: () => themes.LIGHT,
    closeCalculatorOnSubmit: false
  },
  wallet: {
    wallets: mockWallets,
    createWallet: jest.fn(),
    getCurrencyFromWalletById: jest.fn(),
    editWallet: jest.fn(),
    getWalletById: (id) => (id === -1 ? undefined : mockWallet1)
  },
  category: {
    parsedCategories: mockCategories,
    categories: mockCategories,
    changeTransaction: jest.fn(),
    getTransactionById: () => mockTransactions[0],
    parseCategories: () => mockParsedCategories,
    getCategoryById: () => mockCategories[0],
    getIconIdFromCategoryById: (id) => (id === -1 ? -1 : mockCategories[0].iconId),
    transactions: mockTransactions,
    transactionsSort: 'DESC',
    modifyTransactionsFilter: jest.fn(),
    deleteTransaction: jest.fn(),
    transactionsLimit: 10,
    transactionsPage: 1,
    setTransactions: jest.fn()
  },
  currency: {
    exchangeRates: mockExchangeRates,
    userCurrency: mockUserCurrency,
    exchangeRatesDate: mockExchangeRatesDate
  }
};

export const useStore = () => mockStore;
