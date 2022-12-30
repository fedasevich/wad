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
      then(data=> {category.setTransactions(data.rows)    
       
    })
    } catch(e) {
      alert(e.response.data.message);
    }
   

  },[category.transactionsLimit,category.transactionsSort,category])


 
const data = category.transactions

console.log(data)
  const transactions = data.reduce((transactions, transactionItem) => {

    const date = transactionItem.createdAt.split('T')[0];
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











  return (
  <>

  <TransactionProvider>
    <Row >
    {transactionArrays.map((transactionsMap,index)=>{
      return (
    
        <>
<TransactionProvider.Transaction.Date key={index} date={transactionsMap.date}/>
<Accordion>
 {transactionsMap.trs.map((transactions,index)=>{

  return (
    <TransactionToggle eventKey={index}>
<TransactionProvider.Transaction key={transactions.id} transaction={transactions} wallet={wallet} category={category} index={index}/>
</TransactionToggle>

  )
 }

   )}
   </Accordion>

   </>
)

    }
  )}
   
   <TransactionProvider.LoadMore buttonVisible={buttonVisible} setButtonVisible={setButtonVisible} category={category} />
  </Row>
  </TransactionProvider>
  </>

  );

});

export default TransactionsWallet