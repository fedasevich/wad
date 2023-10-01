import { observer } from 'mobx-react-lite';
import React, { Suspense, lazy, useReducer } from 'react';
import { Col } from 'react-bootstrap';

import Loader from '../components/loader/Loader';
import TransactionsColumn from '../components/transaction/TransactionsColumn';

import Wallets from '../components/wallet/Wallets';
import { WALLET_PAGE_STATE } from '../utils/constants';
import PageProvider from './PageProvider';

const EditWallet = lazy(() => import('../components/wallet/EditWallet'));
const WalletWithdraw = lazy(() => import('../components/wallet/WalletWithdraw'));
const WalletTransactions = lazy(() => import('../components/wallet/WalletTransactions'));
const CreateWallet = lazy(() => import('../components/wallet/CreateWallet'));
const WalletTransfer = lazy(() => import('../components/wallet/WalletTransfer'));

export const defaultPage = <TransactionsColumn />;

function reducer(page, { operation, id }) {
  switch (operation) {
    case WALLET_PAGE_STATE.EDIT_WALLET:
      return <EditWallet id={id} />;
    case WALLET_PAGE_STATE.WITHDRAW_WALLET:
      return <WalletWithdraw id={id} />;
    case WALLET_PAGE_STATE.TRANSACTIONS_WALLET:
      return <WalletTransactions id={id} />;
    case WALLET_PAGE_STATE.TRANSFER_WALLET:
      return <WalletTransfer id={id} />;
    case WALLET_PAGE_STATE.DEFAULT_WALLET:
      return defaultPage;
    case WALLET_PAGE_STATE.CREATE_WALLET:
      return WALLET_PAGE_STATE.CREATE_WALLET;
    default:
      return null;
  }
}

export const DispatchContext = React.createContext(null);

const MainPage = observer(() => {
  const [state, dispatch] = useReducer(reducer, defaultPage);

  return (
    <DispatchContext.Provider value={dispatch}>
      <PageProvider pageName="Accounts">
        {state === WALLET_PAGE_STATE.CREATE_WALLET ? (
          <Suspense fallback={<Loader />}>
            <CreateWallet />
          </Suspense>
        ) : (
          <>
            <Col xl={{ span: 4, offset: 1 }} className="mb-4">
              <Wallets />
            </Col>

            <Col xl={{ span: 5, offset: 1 }}>
              <Suspense fallback={<Loader />}>{state}</Suspense>
            </Col>
          </>
        )}
      </PageProvider>
    </DispatchContext.Provider>
  );
});

export default MainPage;
