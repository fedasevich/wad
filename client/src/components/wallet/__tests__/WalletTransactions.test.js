import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { mockWallet1 } from '../../../../setupTests';
import WalletTransactions from '../WalletTransactions';

jest.mock('../../../store');

const mockWallet = mockWallet1;
jest.mock('../../transaction/TransactionsWallet', () => () => <div>Transactions Wallet Component Mock</div>);
describe('WalletTransactions.js', () => {
  beforeEach(() => {
    render(<WalletTransactions id={mockWallet.id} />);
  });

  it('renders the header with action name', () => {
    expect(
      screen.getByRole('heading', {
        name: /transactions/i
      })
    ).toBeInTheDocument();
  });

  it('renders the header with wallet name', () => {
    expect(screen.getByText(new RegExp(`Wallet: ${mockWallet.name}`, 'i'))).toBeInTheDocument();
  });

  it('renders the TransactionsWallet component', () => {
    expect(screen.getByText(/transactions wallet component mock/i)).toBeInTheDocument();
  });
});
