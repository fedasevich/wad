import { format, parseISO } from 'date-fns';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Accordion, Row } from 'react-bootstrap';
import { fetchTransaction } from '../../http/transactionApi';
import { useStore } from '../../store';
import ChangeTransactionModal from './ChangeTransactionModal';
import TransactionProvider from './TransactionProvider';

const Transactions = observer(({ actions }) => {
  const { category } = useStore();
  const [buttonVisible, setButtonVisible] = useState(true);
  const [changeTransactionModal, setChangeTransactionModal] = useState(false);

  useEffect(() => {
    try {
      fetchTransaction(category.transactionsPage, category.transactionsLimit, category.transactionsSort).then(
        (data) => {
          category.setTransactions(data.rows);
        }
      );
    } catch (e) {
      alert(e.response.data.message);
    }
  }, [category.transactionsLimit, category.transactionsSort, category]);

  const data = category.transactions;

  const transactions = data.reduce((transactions, transactionItem) => {
    const date = format(parseISO(transactionItem.createdAt), 'd MMMM y');
    if (!transactions[date]) {
      transactions[date] = [];
    }
    transactions[date].push(transactionItem);
    return transactions;
  }, {});

  const transactionArrays = Object.keys(transactions).map((date) => {
    return {
      date,
      trs: transactions[date]
    };
  });

  const loadMoreTransactions = () => {
    category.modifyTransactionsFilter({ page: category.transactionsPage + 1 });

    try {
      fetchTransaction(category.transactionsPage, category.transactionsLimit, category.transactionsSort).then(
        (data) => {
          if (!data.rows.length) {
            setButtonVisible(false);
          }
          runInAction(() => {
            category.transactions.push(...data.rows);
          });
        }
      );
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <TransactionProvider>
      {actions && <TransactionProvider.Actions setButtonVisible={setButtonVisible} category={category} />}
      {transactionArrays.map((transactionsMap) => {
        return (
          <Row key={transactionsMap.date}>
            <TransactionProvider.Transaction.Date key={transactionsMap.date} date={transactionsMap.date} />
            <Accordion>
              {transactionsMap.trs.map((transactions, index) => (
                <TransactionProvider.Transaction
                  transaction={transactions}
                  key={transactions.id}
                  index={index}
                  setChangeTransactionModal={setChangeTransactionModal}
                />
              ))}
            </Accordion>
          </Row>
        );
      })}
      <Row>
        <TransactionProvider.LoadMore
          buttonVisible={buttonVisible}
          setButtonVisible={setButtonVisible}
          fetchTransaction={loadMoreTransactions}
        />
      </Row>

      <ChangeTransactionModal
        changeTransactionModal={changeTransactionModal.active}
        id={changeTransactionModal.id}
        setChangeTransactionModal={setChangeTransactionModal}
      />
    </TransactionProvider>
  );
});

export default Transactions;
