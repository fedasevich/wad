import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { mockWallet1 } from '../../../../setupTests';
import { WalletItem } from '../WalletItem';

jest.mock('../../../store', () => ({
  useStore: jest.fn()
}));

const mockWallet = mockWallet1;

describe('WalletItem.js', () => {
  it('renders wallet name', () => {
    render(<WalletItem wallet={mockWallet} />);
    const nameElement = screen.getByText(mockWallet.name);
    expect(nameElement).toBeInTheDocument();
  });

  it('renders wallet balance and currency', () => {
    render(<WalletItem wallet={mockWallet} />);
    const balanceElement = screen.getByText(`${mockWallet.balance} ${mockWallet.currency}`);
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
