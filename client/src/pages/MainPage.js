import React from 'react'
import { Container } from 'react-bootstrap'
import Calculator from '../components/calculator/calculator'
import Categories from '../components/Categories'
import Transactions from '../components/Transactions'
import Wallets from '../components/Wallets'


const MainPage = () => {
  return (
    <> 
    <Container>
      <Calculator/>
    <Categories/>
    <Wallets/>
    <Transactions/>
    </Container>
    </>
  )
}

export default MainPage