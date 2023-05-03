import { observer } from 'mobx-react-lite'
import React, { useContext, useReducer } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Categories from '../components/category/Categories'
import EditWallet from '../components/wallet/EditWallet'
import NavBar from '../components/NavBar'

import Wallets from '../components/wallet/Wallets'
import PageProvider from './PageProvider'
import Currencies from '../components/Currencies'
import CreateWallet from '../components/wallet/CreateWallet'
import MenuProvider from '../components/MenuProvider'
import WalletTransactions from '../components/wallet/WalletTransactions'
import TransactionsColumn from '../components/transaction/TransactionsColumn'
import WalletWithdraw from '../components/wallet/WalletWithdraw'
import NotImplemented from '../components/NotImplemented'




 export const defaultPage = <TransactionsColumn/>;



 function reducer(page, { operation, id }) {
  switch (operation) {
    case "EDIT_WALLET":
      return <EditWallet id={id} />
    case "RECHARGE_WALLET":
      return <NotImplemented/>
    case "BALANCE_WALLET":
      return <NotImplemented/>
    case "WITHDRAW_WALLET":
      return <WalletWithdraw id={id}/>
    case "TRANSACTIONS_WALLET":
      return <WalletTransactions id={id}/>
    case "TRANSFER_WALLET":
      return <NotImplemented/> 
    case "DEFAULT_WALLET":
      return defaultPage
      case "CREATE_WALLET":
        return "CREATE_WALLET"
      default:
        return <NotImplemented/>
  }
}

export const DispatchContext = React.createContext(null);

const MainPage = observer(() => {
  const [state, dispatch] = useReducer(reducer, defaultPage)

  

  

  
  return (
    <>
    <DispatchContext.Provider value={dispatch}>
    <PageProvider pageName="Accounts">
{state==="CREATE_WALLET" ? <CreateWallet/>: 
 <>
<Col xl={{ span: 5, offset: 1 }}>{<Wallets />}</Col>

<Col xl={{ span: 5, offset: 1 }}>{state}</Col>
</>
}


</PageProvider>

      </DispatchContext.Provider>


    </>
  )
})




export default MainPage