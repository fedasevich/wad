import { observer } from 'mobx-react-lite';
import React from 'react';
import { toast } from 'react-hot-toast';
import { fetchTransaction } from '../../http/transactionApi';
import { useStore } from '../../store';
import MenuProvider from '../MenuProvider';
import Transactions from './Transactions';

const TransactionsColumn = observer(() => {
  const { category } = useStore();

  const fetchTransactionsColumn = () => {
    try {
      return fetchTransaction(category.transactionsPage, category.transactionsLimit, category.transactionsSort);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <MenuProvider>
      <MenuProvider.Header>
        <h2 className="fw-medium">Recent activity</h2>
      </MenuProvider.Header>

      <MenuProvider.Container>
        <Transactions actions handleFetchTransactions={fetchTransactionsColumn} />
      </MenuProvider.Container>
    </MenuProvider>
  );
});

export default TransactionsColumn;
