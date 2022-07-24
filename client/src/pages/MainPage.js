import { observer } from 'mobx-react-lite'
import React from 'react'
import { Container } from 'react-bootstrap'
import Categories from '../components/Categories'
import Transactions from '../components/Transactions'
import Wallets from '../components/Wallets'


const MainPage = observer(() => {

  return (
    <> 
    <Container>
    <Categories/>
    <Wallets/>
    <Transactions/>
    </Container>
    </>
  )
})

export default MainPage