import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockExchangeRates, mockUserCurrency, mockWallets } from '../../../../../setupTests';

import UserCurrencyConvertModal from '../UserCurrencyConvertModal';

jest.mock('../../../../store');
jest.mock('../../../modal/modal');

describe('UserCurrencyConvertModal.js', () => {
  const userCurrencyConvertModal = true;
  const setUserCurrencyConvertModal = jest.fn();
  const { id, rate } = mockExchangeRates[0];

  beforeEach(async () => {
    render(
      <UserCurrencyConvertModal
        userCurrencyConvertModal={userCurrencyConvertModal}
        setUserCurrencyConvertModal={setUserCurrencyConvertModal}
        currencyToChange={id}
      />
    );
  });

  it('should render modal', () => {
    expect(screen.getByText(/Convert wallets/i)).toBeInTheDocument();
    expect(screen.getByText(/Do you want to convert your wallets balance\?/i)).toBeInTheDocument();
  });

  it('should render wallets with converted balances', async () => {
    mockWallets.forEach((wallet) => {
      expect(screen.getByText(new RegExp(`${wallet.name}`, 'i'))).toBeInTheDocument();
      expect(screen.getByText(`${wallet.balance.toFixed(2)} ${mockUserCurrency.symbol}`)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${(wallet.balance * rate).toFixed(2)}`, 'i'))).toBeInTheDocument();
    });
  });

  // TODO: test button clicks
});
