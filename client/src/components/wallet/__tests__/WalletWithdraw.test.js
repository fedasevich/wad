import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mockWallet1 } from '../../../../setupTests';
import WalletWithdraw from '../WalletWithdraw';

jest.mock('../../../store');

const mockWallet = mockWallet1;

jest.mock('../../calculator/calculator', () => () => <div>Calculator Wallet Component Mock</div>);

describe('WalletWithdraw.js', () => {
  beforeEach(async () => {
    await act(() => {
      render(<WalletWithdraw id={mockWallet.id} />);
    });
  });

  it('renders the header with action name', () => {
    expect(
      screen.getByRole('heading', {
        name: /Withdraw/i
      })
    ).toBeInTheDocument();
  });

  it('renders the header with wallet name', () => {
    expect(screen.getByText(new RegExp(mockWallet.name, 'i'))).toBeInTheDocument();
  });

  it('renders the Calculator component', async () => {
    expect(screen.getByText(/calculator wallet component mock/i)).toBeInTheDocument();
  });
});
