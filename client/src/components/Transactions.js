import React, { useContext } from 'react'
import {observer} from 'mobx-react-lite'
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '../index';


const Categories = observer(() => {
  const {category} = useContext(Context) 
  return (
   
   <Container>
    <h2>Transactions:</h2>
{category.transactions.map(transactionsMap=>
  <Row>
    <Col key={transactionsMap.id} md="12" className="d-inline-flex justify-content-between">
  <h2>{transactionsMap.categoryName}</h2>
 <h4>{transactionsMap.sum}</h4>
 </Col>
 </Row>
)}
 </Container>
  
  );
});

export default Categories