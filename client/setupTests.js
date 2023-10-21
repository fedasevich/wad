import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

export const mockEmail = 'test@example.com';
export const mockPassword = 'password123';

export const mockAuthCredentials = {
  email: mockEmail,
  password: mockPassword
};

export const mockUserId = 9;

export const mockUser = {
  id: mockUserId,
  email: mockEmail,
  subscriber: false,
  iat: 1693065105,
  exp: 1693151505
};

export const mockWallet1 = {
  id: 1,
  name: 'Card 0',
  balance: 1000,
  createdAt: '2022-07-23T10:41:50.398Z',
  updatedAt: '2023-08-23T20:30:29.032Z',
  userId: mockUserId
};

export const mockWallet2 = {
  id: 2,
  name: 'Card 1',
  balance: 500,
  createdAt: '2022-07-23T10:41:51.521Z',
  updatedAt: '2023-08-22T21:42:59.585Z',
  userId: mockUserId
};
export const mockWallet3 = {
  id: 3,
  name: 'Cash',
  balance: 100,
  createdAt: '2022-07-29T21:49:21.027Z',
  updatedAt: '2023-08-22T21:42:59.586Z',
  userId: mockUserId
};

export const mockWallets = [mockWallet1, mockWallet2, mockWallet3];

export const incomeCategory = {
  id: 28,
  name: 'Income',
  iconId: -2,
  isIncome: true,
  deletedAt: null,
  createdAt: '2023-08-23T20:06:44.952Z',
  updatedAt: '2023-08-23T20:06:44.952Z',
  userId: mockUserId
};

export const mockIncomeParsedCategory = {
  id: 28,
  name: 'Income',
  iconId: -2,
  isIncome: true,
  deletedAt: null,
  spent: 22,
  createdAt: '2023-08-23T20:06:44.952Z',
  updatedAt: '2023-08-23T20:06:44.952Z',
  userId: mockUserId
};

export const mockCategories = [
  {
    id: 61,
    name: 'Groceries',
    spent: 1337,
    iconId: 5,
    isIncome: false,
    createdAt: '2022-07-23T10:41:50.397Z',
    updatedAt: '2023-08-16T13:34:03.161Z',
    userId: mockUserId
  },
  {
    id: 62,
    name: 'Gifts',
    spent: 516,
    iconId: 2,
    isIncome: false,
    createdAt: '2022-07-23T10:41:51.026Z',
    updatedAt: '2023-08-16T13:42:11.242Z',
    userId: mockUserId
  },
  {
    id: 63,
    name: 'Transport',
    spent: 103,
    iconId: 3,
    isIncome: false,
    createdAt: '2022-07-23T10:41:51.280Z',
    updatedAt: '2023-07-20T10:08:23.850Z',
    userId: mockUserId
  },
  {
    id: 64,
    name: 'Health',
    spent: 121,
    iconId: 2,
    isIncome: false,
    createdAt: '2022-07-23T10:41:51.373Z',
    updatedAt: '2023-08-12T20:05:56.932Z',
    userId: mockUserId
  },
  {
    id: 65,
    name: 'Leisure',
    spent: 36,
    iconId: 4,
    isIncome: false,
    createdAt: '2022-07-23T10:41:51.531Z',
    updatedAt: '2023-08-23T20:30:29.032Z',
    userId: mockUserId
  },
  {
    id: 66,
    name: 'Shopping',
    spent: 535,
    iconId: 5,
    isIncome: false,
    createdAt: '2022-07-23T10:41:51.543Z',
    updatedAt: '2023-08-12T20:06:23.252Z',
    userId: mockUserId
  },
  {
    id: 67,
    name: 'Family',
    spent: 924,
    iconId: 6,
    isIncome: false,
    createdAt: '2022-07-23T10:41:51.553Z',
    updatedAt: '2023-08-20T16:58:28.862Z',
    userId: mockUserId
  },
  {
    id: 68,
    name: 'test',
    spent: 812,
    iconId: 7,
    isIncome: false,
    createdAt: '2022-07-29T21:34:24.198Z',
    updatedAt: '2023-01-03T19:29:58.075Z',
    userId: mockUserId
  },
  {
    id: 71,
    name: 'ggg',
    spent: 1700,
    iconId: 2,
    isIncome: false,
    createdAt: '2022-08-16T14:57:48.230Z',
    updatedAt: '2023-07-20T11:20:06.177Z',
    userId: mockUserId
  },
  {
    id: 203,
    name: 'asdasd',
    spent: 0,
    iconId: 3,
    isIncome: false,
    createdAt: '2023-08-23T20:06:44.952Z',
    updatedAt: '2023-08-23T20:06:44.952Z',
    userId: mockUserId
  },
  incomeCategory
];

export const mockTransactions = [
  {
    id: 442,
    description: 'Leisure',
    sum: -1,
    walletId: 15,
    userId: mockUserId,
    createdAt: '2023-08-23T20:30:29.033Z',
    updatedAt: '2023-08-23T20:30:29.033Z',
    categoryId: 65
  },
  {
    id: 441,
    description: 'Family',
    sum: -1,
    walletId: 16,
    userId: mockUserId,
    createdAt: '2023-08-20T16:58:28.864Z',
    updatedAt: '2023-08-20T16:58:28.864Z',
    categoryId: 67
  },
  {
    id: 434,
    description: 'Groceries',
    sum: -2,
    walletId: 17,
    userId: mockUserId,
    createdAt: '2023-08-16T13:34:03.163Z',
    updatedAt: '2023-08-16T13:34:03.163Z',
    categoryId: 61
  },
  {
    id: 432,
    description: 'Gifts',
    sum: -3,
    walletId: 15,
    userId: mockUserId,
    createdAt: '2023-08-15T09:45:59.881Z',
    updatedAt: '2023-08-15T09:45:59.881Z',
    categoryId: 62
  },
  {
    id: 431,
    description: 'Groceries',
    sum: -10,
    walletId: 15,
    userId: mockUserId,
    createdAt: '2023-08-15T09:45:58.181Z',
    updatedAt: '2023-08-15T09:45:58.181Z',
    categoryId: 61
  },
  {
    id: 414,
    description: 'Groceries',
    sum: -2,
    walletId: 15,
    userId: mockUserId,
    createdAt: '2023-08-14T19:12:02.965Z',
    updatedAt: '2023-08-14T19:12:02.965Z',
    categoryId: 61
  },
  {
    id: 413,
    description: 'Groceries',
    sum: -1,
    walletId: 15,
    userId: mockUserId,
    createdAt: '2023-08-14T19:12:01.612Z',
    updatedAt: '2023-08-14T19:12:01.612Z',
    categoryId: 61
  },
  {
    id: 398,
    description: 'фыв',
    sum: -20,
    walletId: 15,
    userId: mockUserId,
    createdAt: '2023-08-12T11:50:26.432Z',
    updatedAt: '2023-08-12T11:50:26.432Z',
    categoryId: 64
  },
  {
    id: 395,
    description: 'Family',
    sum: -20,
    walletId: 17,
    userId: mockUserId,
    createdAt: '2023-08-25T17:25:36.561Z',
    updatedAt: '2023-08-07T17:25:36.561Z',
    categoryId: 67
  },
  {
    id: 89,
    description: 'Income',
    sum: 20,
    deletedAt: null,
    createdAt: '2023-08-25T17:25:36.561Z',
    updatedAt: '2023-08-25T17:25:36.561Z',
    categoryId: 28,
    userId: mockUserId,
    walletId: 3
  },
  {
    id: 90,
    description: 'Income',
    sum: 2,
    deletedAt: null,
    createdAt: '2023-08-25T17:25:36.561Z',
    updatedAt: '2023-08-25T17:25:36.561Z',
    categoryId: 28,
    userId: mockUserId,
    walletId: 2
  }
];

export const mockParsedCategories = [
  {
    id: 61,
    name: 'Groceries',
    spent: 15,
    iconId: 5,
    createdAt: '2022-07-23T10:41:50.397Z',
    updatedAt: '2023-08-16T13:34:03.161Z',
    userId: mockUserId
  },
  {
    id: 62,
    name: 'Gifts',
    spent: 3,
    iconId: 2,
    createdAt: '2022-07-23T10:41:51.026Z',
    updatedAt: '2023-08-16T13:42:11.242Z',
    userId: mockUserId
  },
  {
    id: 63,
    name: 'Transport',
    spent: 0,
    iconId: 3,
    createdAt: '2022-07-23T10:41:51.280Z',
    updatedAt: '2023-07-20T10:08:23.850Z',
    userId: mockUserId
  },
  {
    id: 64,
    name: 'Health',
    spent: 20,
    iconId: 2,
    createdAt: '2022-07-23T10:41:51.373Z',
    updatedAt: '2023-08-12T20:05:56.932Z',
    userId: mockUserId
  },
  {
    id: 65,
    name: 'Leisure',
    spent: 1,
    iconId: 4,
    createdAt: '2022-07-23T10:41:51.531Z',
    updatedAt: '2023-08-23T20:30:29.032Z',
    userId: mockUserId
  },
  {
    id: 66,
    name: 'Shopping',
    spent: 0,
    iconId: 5,
    createdAt: '2022-07-23T10:41:51.543Z',
    updatedAt: '2023-08-12T20:06:23.252Z',
    userId: mockUserId
  },
  {
    id: 67,
    name: 'Family',
    spent: 21,
    iconId: 6,
    createdAt: '2022-07-23T10:41:51.553Z',
    updatedAt: '2023-08-20T16:58:28.862Z',
    userId: mockUserId
  },
  {
    id: 68,
    name: 'test',
    spent: 0,
    iconId: 7,
    createdAt: '2022-07-29T21:34:24.198Z',
    updatedAt: '2023-01-03T19:29:58.075Z',
    userId: mockUserId
  },
  {
    id: 71,
    name: 'ggg',
    spent: 0,
    iconId: 2,
    createdAt: '2022-08-16T14:57:48.230Z',
    updatedAt: '2023-07-20T11:20:06.177Z',
    userId: mockUserId
  },
  {
    id: 203,
    name: 'asdasd',
    spent: 0,
    iconId: 3,
    createdAt: '2023-08-23T20:06:44.952Z',
    updatedAt: '2023-08-23T20:06:44.952Z',
    userId: mockUserId
  }
];

export const mockExchangeRates = [
  {
    id: 1,
    currency: 'United States Dolar',
    code: 'USD',
    symbol: '$',
    createdAt: '2023-09-23T19:53:35.000Z',
    updatedAt: '2023-09-23T19:53:35.000Z',
    rate: 0.027345865031748545
  },
  {
    id: 2,
    currency: 'Euro',
    code: 'EUR',
    symbol: '€',
    createdAt: '2023-09-23T19:53:35.000Z',
    updatedAt: '2023-09-23T19:53:35.000Z',
    rate: 0.02593744407238622
  },
  {
    id: 3,
    currency: 'Czech koruna',
    code: 'CZK',
    symbol: 'Kč',
    createdAt: '2023-09-23T19:53:35.000Z',
    updatedAt: '2023-09-23T19:53:35.000Z',
    rate: 0.6323510813203491
  },
  {
    id: 4,
    currency: 'Ukrainian hrivnia',
    code: 'UAH',
    symbol: '₴',
    createdAt: '2023-09-23T19:53:35.000Z',
    updatedAt: '2023-09-23T19:53:35.000Z',
    rate: 1
  },
  {
    id: 5,
    currency: 'Polish złoty',
    code: 'PLN',
    symbol: 'zł',
    createdAt: '2023-09-23T19:53:35.000Z',
    updatedAt: '2023-09-23T19:53:35.000Z',
    rate: 0.12024289063909097
  }
];

export const mockUserCurrency = mockExchangeRates[3];

export const mockExchangeRatesDate = '30.09.2023';

export const awaitAllLoaders = async (cb) => {
  await waitForElementToBeRemoved(() => document.querySelector('.loader'), { timeout: 30000 }).then(async () => {
    await waitFor(() => {
      cb();
    });
  });
};
