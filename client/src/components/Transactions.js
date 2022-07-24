import React, { useContext, useEffect } from 'react'
import {observer} from 'mobx-react-lite'
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '../index';
import { fetchTransaction } from '../http/transactionApi';


const Categories = observer(() => {
  const {category} = useContext(Context) 
  useEffect(()=>{
    try {
      fetchTransaction().then(data=> category.setTransactions(data.rows))
    } catch(e) {
      alert(e.response.data.message);
    }
 
   
  },[])
  return (
   
   <Container>
    <h2>Transactions:</h2>
{category.transactions.map(transactionsMap=>
  <Row>
    <Col key={transactionsMap.id} md="12" className="d-inline-flex justify-content-between">
  <h2>{transactionsMap.description}</h2>
 <h4>{transactionsMap.sum}</h4>
 </Col>
 </Row>
)}
 </Container>
  
  );
});

export default Categories