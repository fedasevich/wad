import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';

export const TEST_CONST = 'help me please';

export const mockEmail = 'test@example.com';
export const mockPassword = 'password123';

export const mockAuthCredentials = {
  email: mockEmail,
  password: mockPassword
};

export const mockUserId = 9;

export const mockUser = {
  id: 9,
  email: mockEmail,
  subscriber: false,
  iat: 1693065105,
  exp: 1693151505
};

export const mockWallet1 = {
  id: 1,
  name: 'Card 0',
  balance: 1000,
  currency: '₴',
  createdAt: '2022-07-23T10:41:50.398Z',
  updatedAt: '2023-08-23T20:30:29.032Z',
  userId: mockUserId
};

export const mockWallet2 = {
  id: 2,
  name: 'Card 1',
  balance: 500,
  currency: 'USDT',
  createdAt: '2022-07-23T10:41:51.521Z',
  updatedAt: '2023-08-22T21:42:59.585Z',
  userId: mockUserId
};
export const mockWallet3 = {
  id: 3,
  name: 'Cash',
  balance: 100,
  currency: 'BTC',
  createdAt: '2022-07-29T21:49:21.027Z',
  updatedAt: '2023-08-22T21:42:59.586Z',
  userId: mockUserId
};

export const mockWallets = [mockWallet1, mockWallet2, mockWallet3];

export const mockCategory1 = {
  id: 1,
  name: 'Groceries',
  spent: 1337,
  iconId: 5,
  createdAt: '2022-07-23T10:41:50.397Z',
  updatedAt: '2023-08-16T13:34:03.161Z',
  userId: mockUserId
};

export const mockCategories = [mockCategory1];

export const mockTransaction1 = {
  id: 1,
  description: 'Leisure',
  sum: 100,
  walletId: mockWallet1.id,
  userId: mockUserId,
  createdAt: '2023-08-23T20:30:29.033Z',
  updatedAt: '2023-08-23T20:30:29.033Z',
  categoryId: mockCategory1.id
};

export const mockTransactions = [mockTransaction1];

export const awaitAllLoaders = async (cb) => {
  await waitForElementToBeRemoved(() => document.querySelector('.loader'), { timeout: 30000 }).then(async () => {
    await waitFor(() => {
      cb();
    });
  });
};
