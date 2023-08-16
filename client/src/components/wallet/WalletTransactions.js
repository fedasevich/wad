import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { fetchWalletTransactionByWalletId } from '../../http/transactionApi';
import { useStore } from '../../store';
import MenuProvider from '../MenuProvider';
import TransactionsWallet from '../transaction/TransactionsWallet';

const WalletTransactions = observer(({ id }) => {
  const { wallet, category } = useStore();

  useEffect(() => {
    try {
      fetchWalletTransactionByWalletId(
        category.transactionsPage,
        category.transactionsLimit,
        category.transactionsSort,
        id
      ).then((data) => {
        category.setTransactions(data.rows);
      });
    } catch (e) {
      alert(e.response.data.message);
    }
  }, [id, category]);

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
