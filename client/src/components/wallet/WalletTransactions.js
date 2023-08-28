import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../store';
import MenuProvider from '../MenuProvider';
import TransactionsWallet from '../transaction/TransactionsWallet';

const WalletTransactions = observer(({ id }) => {
  const { wallet } = useStore();

  return (
    <MenuProvider>
      <MenuProvider.Header.Rounded>
        <h5>Transactions</h5>
        <h6>Wallet: {wallet.getWalletById(id).name}</h6>
      </MenuProvider.Header.Rounded>

      <MenuProvider.Container>
        <TransactionsWallet id={id} />
      </MenuProvider.Container>
    </MenuProvider>
  );
});

export default WalletTransactions;
