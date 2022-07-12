import React from 'react'
import { Container } from 'react-bootstrap'
import Categories from '../components/Categories'
import Transactions from '../components/Transactions'
import Wallets from '../components/Wallets'

const MainPage = () => {
  return (
    <>
    <Container>
    <Categories/>
    <Wallets/>
    <Transactions/>
    </Container>
    </>
  )
}

export default MainPage