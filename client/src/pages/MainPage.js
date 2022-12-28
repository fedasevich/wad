import { observer } from 'mobx-react-lite'
import React, { useContext, useReducer } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Categories from '../components/Categories'
import EditWallet from '../components/wallet/EditWallet'
import NavBar from '../components/NavBar'
import Transactions from '../components/Transactions'
import Wallets from '../components/wallet/Wallets'
import PageProvider from './PageProvider'
import Currencies from '../components/Currencies'
import CreateWallet from '../components/wallet/CreateWallet'
import MenuProvider from '../components/MenuProvider'




 export const defaultPage = <Transactions />;



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
    case "DEFAULT_WALLET":
      return defaultPage
      case "CREATE_WALLET":
        return [<CreateWallet/>,    <>
        <MenuProvider>
          <MenuProvider.Header><h2>Choose currency:</h2></MenuProvider.Header>
          <MenuProvider.Container className="d-flex flex-column">
         <Currencies  />
             </MenuProvider.Container>
        </MenuProvider> 
        </>]
  }
}

export const DispatchContext = React.createContext(null);

const MainPage = observer(() => {
  const [state, dispatch] = useReducer(reducer, defaultPage)

  

  

  
  return (
    <>
    <DispatchContext.Provider value={dispatch}>
    <PageProvider pageName="Accounts">
{Array.isArray(state) ? <CreateWallet/>: 
 <>
<Col xl={{ span: 4, offset: 1 }}>{<Wallets />}</Col>

<Col xl={{ span: 6, offset: 1 }}>{state}</Col>
</>
}


</PageProvider>

      </DispatchContext.Provider>


    </>
  )
})




export default MainPage