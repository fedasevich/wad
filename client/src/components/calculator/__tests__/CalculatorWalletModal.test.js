import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockUserCurrency, mockWallets } from '../../../../setupTests';
import CalculatorWalletModal from '../CalculatorWalletModal'; // Replace with the correct import path

jest.mock('../../../store');
jest.mock('../../modal/modal');

describe('CalculatorWalletModal.js', () => {
  it('renders the modal correctly', () => {
    render(<CalculatorWalletModal walletModalActive setWalletModalActive={jest.fn()} setSelectedWallet={jest.fn()} />);

    expect(screen.getByText('Choose wallet')).toBeInTheDocument();
    mockWallets.forEach((wallet) => {
      expect(
        screen.getByRole('heading', {
          name: wallet.name
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('heading', {
          name: `${wallet.balance.toFixed(2)} ${mockUserCurrency.symbol}`
        })
      ).toBeInTheDocument();
    });
  });

  it('calls setSelectedWallet when a wallet is selected', () => {
    const setSelectedWalletMock = jest.fn();
    const setWalletModalActiveMock = jest.fn();

    render(
      <CalculatorWalletModal
        walletModalActive
        setWalletModalActive={setWalletModalActiveMock}
        setSelectedWallet={setSelectedWalletMock}
      />
    );

    const selectedWallet = mockWallets[0];
    const walletButton = screen.getByText(selectedWallet.name);
    fireEvent.click(walletButton);

    expect(setSelectedWalletMock).toHaveBeenCalledWith(selectedWallet);
    expect(setWalletModalActiveMock).toHaveBeenCalledWith(false);
  });
});
