import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { mockExchangeRates, mockUserCurrency, mockWallets } from '../../../../../setupTests';

import UserCurrencyConvertModal from '../UserCurrencyConvertModal';

jest.mock('../../../../store');
jest.mock('../../../modal/modal');

jest.mock('../UserCurrencyConvertConfirmModal', () => () => <div>UserCurrencyConvertConfirmModal</div>);

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

  it('should open confirm modal when "yes" clicked', async () => {
    const button = screen.getByRole('button', {
      name: /yes/i
    });

    expect(button).toBeInTheDocument();
    await act(() => {
      fireEvent.click(button);
    });
    expect(screen.getByText(/UserCurrencyConvertConfirmModal/i)).toBeInTheDocument();
  });

  it('should open confirm modal when "no" clicked', async () => {
    const button = screen.getByRole('button', {
      name: /no/i
    });

    expect(button).toBeInTheDocument();
    await act(() => {
      fireEvent.click(button);
    });
    expect(screen.getByText(/UserCurrencyConvertConfirmModal/i)).toBeInTheDocument();
  });
});
