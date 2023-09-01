import { observer } from 'mobx-react-lite';
import React from 'react';
import { toast } from 'react-hot-toast';
import { fetchWalletTransactionByWalletId } from '../../http/transactionApi';
import { useStore } from '../../store';
import Transactions from './Transactions';

const TransactionsWallet = observer(({ id }) => {
  const { category } = useStore();

  const fetchWalletTransactions = () => {
    try {
      return fetchWalletTransactionByWalletId(
        category.transactionsPage,
        category.transactionsLimit,
        category.transactionsSort,
        id
      );
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return <Transactions actions handleFetchTransactions={fetchWalletTransactions} walletId={id} />;
});

export default TransactionsWallet;
