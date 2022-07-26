import React, { useContext, useEffect } from 'react'
import {observer} from 'mobx-react-lite'
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '../index';
import { fetchTransaction } from '../http/transactionApi';


const Categories = observer(() => {
  const {category} = useContext(Context) 
  useEffect(()=>{
    try {
      fetchTransaction().then(data=> category.setTransactions(data.rows.sort(function(a,b){
        return b.createdAt.localeCompare(a.createdAt);
      })))
    } catch(e) {
      alert(e.response.data.message);
    }
   

  },[])
 
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
{transactionArrays.map(transactionsMap=>

  <Row>
    
     
     <h2>{transactionsMap.date}</h2> 
   {transactionsMap.trs.map(transactions=>
       <Col key={transactions.id} md="12" className="d-inline-flex justify-content-between">
       <h2>{transactions.description}</h2>
      <h4>{transactions.sum}</h4>
      </Col>
      
     )}
     </Row>
 
      
    )}
         </Container>
      </>
  );

});

export default Categories