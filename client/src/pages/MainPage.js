import { observer } from 'mobx-react-lite';
import React, { Suspense, lazy, useReducer } from 'react';
import { Col } from 'react-bootstrap';

import Loader from '../components/loader/Loader';
import TransactionsColumn from '../components/transaction/TransactionsColumn';
import Wallets from '../components/wallet/Wallets';
import PageProvider from './PageProvider';

const EditWallet = lazy(() => import('../components/wallet/EditWallet'));
const NotImplemented = lazy(() => import('../components/NotImplemented'));
const WalletWithdraw = lazy(() => import('../components/wallet/WalletWithdraw'));
const WalletTransactions = lazy(() => import('../components/wallet/WalletTransactions'));
const CreateWallet = lazy(() => import('../components/wallet/CreateWallet'));

export const defaultPage = <TransactionsColumn />;

function reducer(page, { operation, id }) {
  switch (operation) {
    case 'EDIT_WALLET':
      return <EditWallet id={id} />;
    case 'RECHARGE_WALLET':
      return <NotImplemented />;
    case 'BALANCE_WALLET':
      return <NotImplemented />;
    case 'WITHDRAW_WALLET':
      return <WalletWithdraw id={id} />;
    case 'TRANSACTIONS_WALLET':
      return <WalletTransactions id={id} />;
    case 'TRANSFER_WALLET':
      return <NotImplemented />;
    case 'DEFAULT_WALLET':
      return defaultPage;
    case 'CREATE_WALLET':
      return 'CREATE_WALLET';
    default:
      return <NotImplemented />;
  }
}

export const DispatchContext = React.createContext(null);

const MainPage = observer(() => {
  const [state, dispatch] = useReducer(reducer, defaultPage);

  return (
    <DispatchContext.Provider value={dispatch}>
      <PageProvider pageName="Accounts">
        {state === 'CREATE_WALLET' ? (
          <Suspense fallback={<Loader />}>
            <CreateWallet />
          </Suspense>
        ) : (
          <>
            <Col xl={{ span: 4, offset: 1 }}>
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
