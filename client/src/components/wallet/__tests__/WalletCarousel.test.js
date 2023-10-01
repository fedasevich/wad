import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockUserCurrency, mockWallet2, mockWallet3, mockWallets } from '../../../../setupTests';
import { useStore } from '../../../store';
import { themes } from '../../../utils/constants';
import { WalletCarousel } from '../WalletCarousel';

jest.mock('../../../store', () => ({
  useStore: jest.fn()
}));

describe('WalletCarousel.js', () => {
  const mockUseStore = () => ({
    wallet: { wallets: mockWallets },
    userSettings: {
      isThemeDark: () => themes.LIGHT
    },
    currency: {
      userCurrency: mockUserCurrency
    }
  });
  beforeEach(() => {
    useStore.mockImplementation(mockUseStore);
  });

  it('displays wallet items', () => {
    render(<WalletCarousel />);

    mockWallets.forEach((wallet) => {
      const walletName = screen.getByText(wallet.name);
      expect(walletName).toBeInTheDocument();
    });
  });

  it('selects the correct wallet', () => {
    const setSelectedWallet = jest.fn();
    const selectedWallet = mockWallet2;
    const expectedSelectedWallet = mockWallet3;

    render(<WalletCarousel selectedWallet={selectedWallet} setSelectedWallet={setSelectedWallet} />);
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    expect(setSelectedWallet).toHaveBeenCalledWith(expectedSelectedWallet);
  });

  it('defaults to the first wallet when selectedWallet is not provided', () => {
    render(<WalletCarousel />);
    const firstWallet = mockWallets[0];

    const firstWalletName = screen.getByText(firstWallet.name);
    expect(firstWalletName).toBeInTheDocument();
  });

  it('handles missing selectedWallet correctly', () => {
    useStore.mockReturnValue({
      wallet: {
        wallets: []
      },
      userSettings: {
        isThemeDark: () => themes.LIGHT
      }
    });

    const { container } = render(<WalletCarousel />);
    const carousel = container.querySelector('.carousel-inner');

    expect(carousel).toBeEmptyDOMElement();
  });
});
