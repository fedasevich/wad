import { format, parseISO } from 'date-fns';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Row, useAccordionButton } from 'react-bootstrap';
import { fetchTransaction } from '../../http/transactionApi';
import { Context } from '../../index';
import ChangeTransactionModal from './ChangeTransactionModal';
import TransactionProvider from './TransactionProvider';

function TransactionToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div onClick={decoratedOnClick}>
      {children}
    </div>
  );
}

const Transactions = observer(({ actions }) => {
  const { category, wallet } = useContext(Context)
  const [buttonVisible, setButtonVisible] = useState(true)
  const [changeTransactionModal, setChangeTransactionModal] = useState(false)

  useEffect(() => {
    try {
      fetchTransaction(category.transactionsPage, category.transactionsLimit, category.transactionsSort)
        .then(data => {
          category.setTransactions(data.rows)

        })
    } catch (e) {
      alert(e.response.data.message);
    }
  }, [category.transactionsLimit, category.transactionsSort, category])

  const data = category.transactions

  const transactions = data.reduce((transactions, transactionItem) => {
    const date = format(parseISO(transactionItem.createdAt), "d MMMM y");
    if (!transactions[date]) {
      transactions[date] = [];
    }
    transactions[date].push(transactionItem);
    return transactions;
  }, {})

  const transactionArrays = Object.keys(transactions).map((date) => {
    return {
      date,
      trs: transactions[date]
    };
  })

  const loadMoreTransactions = () => {
    category.setTransactionsPage(category.transactionsPage + 1);

    try {
      fetchTransaction(category.transactionsPage, category.transactionsLimit, category.transactionsSort).then(data => {
        if (!data.rows.length) {
          setButtonVisible(false)
        };
        runInAction(() => {
          category.transactions.push(...data.rows)
        })
      })
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <>
      <TransactionProvider>
        {actions && <TransactionProvider.Actions setButtonVisible={setButtonVisible} category={category} />}
        {transactionArrays.map((transactionsMap, index) => {
          return (
            <Row key={transactionsMap.date}>
              <TransactionProvider.Transaction.Date key={index} date={transactionsMap.date} />
              <Accordion>
                {transactionsMap.trs.map((transactions, index) => {
                  return (
                    <TransactionToggle eventKey={index} key={transactions.id}>
                      <TransactionProvider.Transaction transaction={transactions} wallet={wallet} category={category} index={index} setChangeTransactionModal={setChangeTransactionModal} />
                    </TransactionToggle>
                  )
                }
                )}
              </Accordion>
            </Row>
          )
        }
        )}
        <Row>
          <TransactionProvider.LoadMore buttonVisible={buttonVisible}
            setButtonVisible={setButtonVisible}
            fetchTransaction={loadMoreTransactions}
          />
        </Row>

        <ChangeTransactionModal changeTransactionModal={changeTransactionModal.active} id={changeTransactionModal.id} setChangeTransactionModal={setChangeTransactionModal} />
      </TransactionProvider>
    </>
  );
});

export default Transactions