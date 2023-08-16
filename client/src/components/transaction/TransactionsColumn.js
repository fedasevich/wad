import { observer } from 'mobx-react-lite';
import React from 'react';
import MenuProvider from '../MenuProvider';
import Transactions from './Transactions';

const TransactionsColumn = observer(() => {
  return (
    <MenuProvider>
      <MenuProvider.Header>
        <h3 className="fw-bold">Recent activity</h3>
      </MenuProvider.Header>

      <MenuProvider.Container>
        <Transactions actions />
      </MenuProvider.Container>
    </MenuProvider>
  );
});

export default TransactionsColumn;
