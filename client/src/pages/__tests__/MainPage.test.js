import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { act } from 'react-dom/test-utils';
import { mockWallet1 } from '../../../setupTests';
import { WALLET_ACTIONS_AND_ICONS } from '../../components/wallet/WalletActions';
import MainPage from '../MainPage';

jest.mock('../../components/transaction/TransactionsColumn', () => () => <div>Recent activity</div>);
jest.mock('../../components/wallet/EditWallet', () => () => <div>Edit Wallet Component Mock</div>);
jest.mock('../../components/wallet/WalletWithdraw', () => () => <div>Withdraw Wallet Component Mock</div>);
jest.mock('../../components/wallet/WalletTransactions', () => () => <div>Transactions Wallet Component Mock</div>);
jest.mock('../../components/wallet/CreateWallet', () => () => <div>Create Wallet Component Mock</div>);
jest.mock('../../components/wallet/WalletTransfer', () => () => <div>Transfer Wallet Component Mock</div>);
jest.mock('../../store');

describe('MainPage.js', () => {
  beforeEach(() => {
    render(<MainPage />);
  });

  it('renders the default page', () => {
    expect(screen.getByText(/Recent activity/i)).toBeInTheDocument();
    expect(screen.getByText(/Accounts/i)).toBeInTheDocument();
  });

  describe('WalletActions', () => {
    WALLET_ACTIONS_AND_ICONS.forEach((icon) => {
      it(`switches active page state to ${icon.name}`, async () => {
        fireEvent.click(
          screen.queryByRole('heading', {
            name: new RegExp(`${mockWallet1.name}`, 'i')
          })
        );
        await act(() => {
          fireEvent.click(
            screen.getAllByRole('button', {
              name: new RegExp(`${icon.name}`, 'i')
            })[0]
          );
        });

        expect(screen.getByText(new RegExp(`${icon.name} wallet component mock`, 'i'))).toBeInTheDocument();
      });
    });

    it('switches active page state to Create Wallet', async () => {
      await act(() => {
        fireEvent.click(
          screen.getByRole('button', {
            name: /add wallet/i
          })
        );
      });

      expect(screen.getByText(/create wallet component mock/i)).toBeInTheDocument();
    });
  });
});
