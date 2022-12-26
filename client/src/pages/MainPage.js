import { observer } from 'mobx-react-lite'
import React, { useReducer } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Categories from '../components/Categories'
import EditWallet from '../components/wallet/EditWallet'
import NavBar from '../components/NavBar'
import Transactions from '../components/Transactions'
import Wallets from '../components/wallet/Wallets'
import PageProvider from './PageProvider'
// {icon:<RechargeIcon/>,action:"EDIT_WALLET",name:"Edit"},
// {icon:<EditIcon/>,action:"RECHARGE_WALLET",name:"Recharge"},
// {icon:<BalanceIcon/>,action:"BALANCE_WALLET",name:"Balance"},
// {icon:<WithdrawIcon/>,action:"WITHDRAW_WALLET",name:"Withdraw"},
// {icon:<TransactionsIcon/>,action:"TRANSACTIONS_WALLET",name:"Transactions"},
// {icon:<TransferIcon/>,action:"TRANSFER_WALLET",name:"Transfer"},
function reducer(page, { operation, id }) {
  switch (operation) {
    case "EDIT_WALLET":
      return <EditWallet id={id} />
    case "RECHARGE_WALLET":
      return <EditWallet id={id} />
    case "BALANCE_WALLET":
      return <Wallets id={id}/>
    case "WITHDRAW_WALLET":
      return <Wallets id={id}/>
    case "TRANSACTIONS_WALLET":
      return <Wallets id={id}/>
    case "TRANSFER_WALLET":
      return <Wallets id={id}/> 
  }
}

const MainPage = observer(() => {
  const [state, dispatch] = useReducer(reducer, <Transactions />)
  return (
    <>
      <PageProvider pageName="Accounts">




        <Col xl={{ span: 4, offset: 1 }}><Wallets dispatch={dispatch} /></Col>

        <Col xl={{ span: 6, offset: 1 }}>{state}</Col>

      </PageProvider>


    </>
  )
})

export default MainPage