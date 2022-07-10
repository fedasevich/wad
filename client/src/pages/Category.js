import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Categories from '../components/Categories'
import Transactions from '../components/Transactions'

const Category = () => {
  return (
    <Container>
      <Row>
        
        <Categories/>
        <Transactions/>
      </Row>
    </Container>
  )
}

export default Category