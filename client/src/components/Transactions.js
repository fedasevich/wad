import React, { useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row } from 'react-bootstrap';
import { Context } from '../index';
import { changeTransaction, deleteTransaction, fetchTransaction } from '../http/transactionApi';
import Modal from './modal/modal';
import { runInAction } from 'mobx';



const Transactions = observer(() => {
  const {category,wallet} = useContext(Context) 
  const [buttonVisible,setButtonVisible] = useState(true)
  const [changeTransactionModal,setChangeTransactionModal] = useState(false)
  const [newSum,setNewSum] = useState('')
  const [newDescription,setNewDescription] = useState('')
  const [transactionsSort,setTransactionsSort] = useState("DESC")
  useEffect(()=>{
    try {
      fetchTransaction(category.transactionsPage,category.transactionsLimit,transactionsSort).then(data=> {category.setTransactions(data.rows)
    
    })
    } catch(e) {
      alert(e.response.data.message);
    }
   

  },[category.transactionsLimit,transactionsSort])


 
const data = category.transactions

  const transactions = data.reduce((transactions, transactionItem) => {
    const date = transactionItem.createdAt.split('T')[0];
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

  console.log({...transactionArrays})


  return (
   <>
   <Container> 
    <h2>Transactions:</h2>
 
<Button onClick={()=> {
setTransactionsSort(transactionsSort==="DESC" ? "ASC" : "DESC" )
category.setTransactionsPage(1)
setButtonVisible(true)
}}>sort</Button>
<ButtonToolbar className="justify-content-end"aria-label="Toolbar with button groups">
      <ButtonGroup className="me-2" aria-label="First group">
      <Button onClick={()=>{
      category.setTransactionsLimit(5);
      category.setTransactionsPage(1)
      setButtonVisible(true)
    }}>5</Button>
    <Button onClick={()=>{
      category.setTransactionsLimit(10);
      category.setTransactionsPage(1)
      setButtonVisible(true)
    }}>10</Button>
    <Button onClick={()=>{
      category.setTransactionsLimit(20);
      category.setTransactionsPage(1)
      setButtonVisible(true)
    }}>20</Button>
    <Button onClick={()=>{
      category.setTransactionsLimit(30);
      category.setTransactionsPage(1)
      setButtonVisible(true)
    }}>30</Button>
      </ButtonGroup>
    </ButtonToolbar>




{transactionArrays.map(transactionsMap=>
 
  <Row>
    
     
     <h2>{transactionsMap.date}</h2> 
   {transactionsMap.trs.map(transactions=>

       <Col key={transactions.id} md="12" className="d-inline-flex justify-content-between">
       <h2>{transactions.description}</h2>
    <div className="d-flex flex-direction-row">  
      <h4>{transactions.sum}</h4>
       <Button className="ml-2 btn-danger" onClick={()=>{
          
        
       try {
        deleteTransaction(transactions.id).
        then(()=> {
          const transactionIndex =  category.transactions.findIndex(transaction => transaction.id === transactions.id)
          const walletIndex = wallet.wallets.findIndex(wallet => wallet.id === transactions.walletId)
          const categoryIndex = category.categories.findIndex(category =>category.id === transactions.categoryId)
          wallet.wallets[walletIndex].balance += parseFloat(category.transactions[transactionIndex].sum)
          category.categories[categoryIndex].spent -= parseFloat(category.transactions[transactionIndex].sum)
       
       category.transactions.splice(transactionIndex, 1)
        })
      } catch(e) {
        alert(e.response.data.message);
      }
      }}> Delete</Button>
       <Button onClick={()=>{
        category.setSelectedTransaction(transactions)
        console.log(category.selectedTransaction.categoryId)
        setChangeTransactionModal(true)
       }}>Change</Button>
       </div> 
      </Col>
     
     )}
     </Row>
    
    )}
  
{ buttonVisible ?    
    <Button className={"d-flex justify-content-center mb-5"} onClick={()=> {
      category.setTransactionsPage(category.transactionsPage+1);  
      console.log(category.transactionsPage)
      try {
        fetchTransaction(category.transactionsPage,category.transactionsLimit,transactionsSort).then(data=> 
          {
            if(!data.rows.length) {
              setButtonVisible(false)
            }
        
            category.transactions.push(...data.rows)
        

          })
      } catch(e) {
        alert(e.response.data.message);
      }

      }}>Load More</Button>:
      <h2 className="text-center">There is nothing to load...</h2>
      }
         </Container>

         <Modal  active={changeTransactionModal} setActive={setChangeTransactionModal}>
          <h2>{transactions.description}</h2>
          <h2>{transactions.id}</h2>
          <h2>{transactions.sum}</h2>
          <div className="d-flex align-items-center flex-column ">
          <input  className="mb-2" type="text" name="newSum" placeholder="New sum..." value={newSum}
         onChange={e => setNewSum(e.target.value)}/>

        <input  className="mb-2" type="text" name="newDescription" placeholder="New description..." value={newDescription}
         onChange={e => setNewDescription(e.target.value)}/>
    

         <Button onClick={()=>{
if(!newSum && !newDescription) {
  return alert(`Not enough data`)
}


       try {
        changeTransaction(category.selectedTransaction.id,newSum ? newSum:null,newDescription?newDescription:null).
        then(()=> {
          runInAction(() =>
          { 
            const transactionIndex =  category.transactions.findIndex(transaction => transaction.id === category.selectedTransaction.id)

            if(newSum) {
           
           const walletIndex = wallet.wallets.findIndex(wallet => wallet.id === category.selectedTransaction.walletId)
           const categoryIndex = category.categories.findIndex(categoryIndex => categoryIndex.id === category.selectedTransaction.categoryId)
           wallet.wallets[walletIndex].balance = (parseFloat(wallet.wallets[walletIndex].balance) + parseFloat(category.selectedTransaction.sum)) - parseFloat(newSum)
           category.categories[categoryIndex].spent = (parseFloat(category.categories[categoryIndex].spent) - parseFloat(category.selectedTransaction.sum)) + parseFloat(newSum)
           category.transactions[transactionIndex].sum = newSum
          
            }
            if(newDescription) {
              category.transactions[transactionIndex].description = newDescription
            }
        
         })
         setChangeTransactionModal(false)
        })
      } catch(e) {
        alert(e.response.data.message);
      }

       }}>Save</Button>
          
      </div>
        
    </Modal>
      </>
  );

});

export default Transactions