import React, { useContext, useEffect, useMemo, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Accordion, Button, ButtonGroup, ButtonToolbar, Col, Container, Row, useAccordionButton } from 'react-bootstrap';
import { Context } from '../../index';
import { changeTransaction, deleteTransaction, fetchTransaction, fetchWalletTransactionByWalletId } from '../../http/transactionApi';
import Modal from '../modal/modal';
import { runInAction } from 'mobx';
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import ChangeTransactionModal from './ChangeTransactionModal';
import TransactionProvider from './TransactionProvider';
import { format, parseISO } from 'date-fns';


function TransactionToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div
      
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

const TransactionsWallet = observer(({actions,id}) => {
  const {category,wallet} = useContext(Context) 
  const [buttonVisible,setButtonVisible] = useState(true)
  const [changeTransactionModal,setChangeTransactionModal] = useState(false)

  const [newSum,setNewSum] = useState('')
  const [newDescription,setNewDescription] = useState('')
  useEffect(()=>{
    try {
      fetchWalletTransactionByWalletId(category.transactionsPage,category.transactionsLimit,category.transactionsSort,id).
      then(data=> {
        runInAction(() => {
          category.setTransactions(data.rows)    

        })
       
    })
    } catch(e) {
      alert(e.response.data.message);
    }
   

  },[category.transactionsLimit,category.transactionsSort,category,id])


 
const data = category.transactions

console.log(data)
  const transactions = data.reduce((transactions, transactionItem) => {

    const date = format(parseISO(transactionItem.createdAt),"d MMMM y");
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
    fetchWalletTransactionByWalletId(category.transactionsPage, category.transactionsLimit, category.transactionsSort,id).then(data => {
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
    
    {transactionArrays.map((transactionsMap)=>{
      return (
    
        <Row key={transactionsMap.date}>
<TransactionProvider.Transaction.Date  date={transactionsMap.date}/>
<Accordion>
 {transactionsMap.trs.map((transactions,index)=>{

  return (
    <TransactionToggle eventKey={index} key={transactions.id}>
<TransactionProvider.Transaction  transaction={transactions} wallet={wallet} category={category} index={index}/>
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
   <TransactionProvider.LoadMore buttonVisible={buttonVisible} setButtonVisible={setButtonVisible}  fetchTransaction={loadMoreWalletTransactions} />
   </Row>
  
 
  </TransactionProvider>
  </>

  );

});

export default TransactionsWallet