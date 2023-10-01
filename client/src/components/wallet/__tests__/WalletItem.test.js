import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { mockUserCurrency, mockWallet1 } from '../../../../setupTests';
import { WalletItem } from '../WalletItem';

jest.mock('../../../store');

const mockWallet = mockWallet1;

describe('WalletItem.js', () => {
  it('renders wallet name', () => {
    render(<WalletItem wallet={mockWallet} />);
    const nameElement = screen.getByText(mockWallet.name);
    expect(nameElement).toBeInTheDocument();
  });

  it('renders wallet balance and currency', () => {
    render(<WalletItem wallet={mockWallet} />);
    const balanceElement = screen.getByText(`${mockWallet.balance.toFixed(2)} ${mockUserCurrency.symbol}`);
    expect(balanceElement).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<WalletItem wallet={mockWallet} />);
    expect(container).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    render(<WalletItem wallet={mockWallet} />);
  });
});
