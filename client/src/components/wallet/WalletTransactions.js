import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { DispatchContext } from '../../pages/MainPage';
import { useStore } from '../../store';
import { WALLET_PAGE_STATE } from '../../utils/constants';
import MenuProvider from '../MenuProvider';
import TransactionsWallet from '../transaction/TransactionsWallet';

const WalletTransactions = observer(({ id }) => {
  const { wallet } = useStore();
  const dispatch = useContext(DispatchContext);

  const handleClose = () => {
    dispatch({ operation: WALLET_PAGE_STATE.DEFAULT_WALLET, id: -1 });
  };

  return (
    <MenuProvider>
      <MenuProvider.Actions onClose={handleClose}>
        <h5>Transactions</h5>
        <h6>Wallet: {wallet.getWalletById(id).name}</h6>
      </MenuProvider.Actions>

      <MenuProvider.Container>
        <TransactionsWallet id={id} />
      </MenuProvider.Container>
    </MenuProvider>
  );
});

export default WalletTransactions;
