import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { incomeCategory, mockWallet1 } from '../../../../setupTests';
import WalletRecharge from '../WalletRecharge';

jest.mock('../../../store');

const mockWallet = mockWallet1;

jest.mock('../../calculator/calculator', () => () => <div>Calculator Wallet Component Mock</div>);

describe('WalletRecharge.js', () => {
  beforeEach(async () => {
    await act(() => {
      render(<WalletRecharge id={mockWallet.id} />);
    });
  });

  it('renders the header with action name', () => {
    expect(
      screen.getByRole('heading', {
        name: /Recharge/i
      })
    ).toBeInTheDocument();
  });

  it('renders the header with income category name', () => {
    expect(screen.getByText(new RegExp(incomeCategory.name, 'i'))).toBeInTheDocument();
  });

  it('renders the header with wallet name', () => {
    expect(screen.getAllByText(new RegExp(mockWallet.name, 'i')).length).toBe(2);
  });

  it('renders the Calculator component', async () => {
    expect(screen.getByText(/calculator wallet component mock/i)).toBeInTheDocument();
  });
});
