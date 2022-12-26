import { observer } from 'mobx-react-lite'
import React, { useReducer } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Categories from '../components/Categories'
import EditWallet from '../components/wallet/EditWallet'
import NavBar from '../components/NavBar'
import Transactions from '../components/Transactions'
import Wallets from '../components/wallet/Wallets'
import PageProvider from './PageProvider'

function reducer(state,{operation,id}) {
switch(operation){
  case "categories":
    return <Categories/>
  case "wallets":
    return <EditWallet id={id}/>
}
}

const MainPage = observer(() => {
const [state,dispatch]= useReducer(reducer,<Transactions/>)
  return (
    <> 
    <PageProvider pageName="Accounts">
     <Col lg="6"><Wallets dispatch={dispatch}/></Col>
       <Col lg="6">{state}</Col> 
    </PageProvider>


    </>
  )
})

export default MainPage