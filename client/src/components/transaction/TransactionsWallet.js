import { format, parseISO } from 'date-fns';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Row, useAccordionButton } from 'react-bootstrap';
import { fetchWalletTransactionByWalletId } from '../../http/transactionApi';
import { Context } from '../../index';
import TransactionProvider from './TransactionProvider';


function TransactionToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div onClick={decoratedOnClick}>
      {children}
    </div>
  );
}

const TransactionsWallet = observer(({ id }) => {
  const { category, wallet } = useContext(Context)
  const [buttonVisible, setButtonVisible] = useState(true)

  useEffect(() => {
    try {
      fetchWalletTransactionByWalletId(category.transactionsPage, category.transactionsLimit, category.transactionsSort, id)
        .then(data => {
          runInAction(() => {
            category.setTransactions(data.rows)
          })
        })
    } catch (e) {
      alert(e.response.data.message);
    }
  }, [category.transactionsLimit, category.transactionsSort, category, id])

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


  const loadMoreWalletTransactions = () => {
    category.setTransactionsPage(category.transactionsPage + 1);

    try {
      fetchWalletTransactionByWalletId(category.transactionsPage, category.transactionsLimit, category.transactionsSort, id).then(data => {
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
    <TransactionProvider>
      {transactionArrays.map((transactionsMap) => {
        return (
          <Row key={transactionsMap.date}>
            <TransactionProvider.Transaction.Date date={transactionsMap.date} />
            <Accordion>
              {transactionsMap.trs.map((transactions, index) => {
                return (
                  <TransactionToggle eventKey={index} key={transactions.id}>
                    <TransactionProvider.Transaction transaction={transactions} wallet={wallet} category={category} index={index} />
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
        <TransactionProvider.LoadMore buttonVisible={buttonVisible} setButtonVisible={setButtonVisible} fetchTransaction={loadMoreWalletTransactions} />
      </Row>
    </TransactionProvider>
  );
});

export default TransactionsWallet