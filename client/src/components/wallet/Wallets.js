import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Card, Col, Row, useAccordionButton } from 'react-bootstrap';
import { fetchWallet } from '../../http/walletApi';
import { DispatchContext } from '../../pages/MainPage';
import { useStore } from '../../store';
import WalletActions from './WalletActions';


function WalletToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div
      className='d-flex flex-row justify-content-between align-items-center'
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

const Wallets = observer(() => {
  const { wallet } = useStore()
  const dispatch = useContext(DispatchContext)
  const [createWalletModal, setCreateWalletModal] = useState(false)

  useEffect(() => {
    try {
      fetchWallet().then(data => {
        runInAction(() => {
          wallet.setWallet(data)
        })

      })
    } catch (e) {
      alert(e.response.data.message);
    }
  }, [])
  return (

    <>
      <Row className='fw-medium'>
        <Accordion >
          {wallet.wallets.map((walletsMap, index) =>

            <Col md="12" className='mb-4 wallet ' key={index}>




              <Card className='component-shadow' >
                <Card.Header>
                  <WalletToggle eventKey={index}> <h4 className='m-0'>{walletsMap.name}</h4>
                    <h6 className='m-0' >{walletsMap.balance} {walletsMap.currency}</h6></WalletToggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body><WalletActions dispatch={dispatch} id={walletsMap.id} /></Card.Body>
                </Accordion.Collapse>
              </Card>

              {/* <div className="p-4 mb-2 " 
        style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,
        border:walletsMap.id === wallet.selectedWallet.id ? '3px solid red' : '3px solid black'}}
        onClick={()=> wallet.setSelectedWallet(walletsMap) }  
         key={walletsMap.id}>
           
            <h1>{walletsMap.name}</h1>
            <h4>{walletsMap.balance} {walletsMap.currency}</h4>
        </div>
        <div className="p-4 mb-2 " 
     style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,border: '3px solid green'}}
       onClick={()=> {
         dispatch({operation:"categories",id:walletsMap.id})
       } }  
   >
<h1>+</h1>
     </div>
     <div className="p-4 mb-2 " 
     style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,border: '3px solid green'}}
       onClick={()=> {
        dispatch({operation:"wallets",id:walletsMap.id})
       } }  
   >
<h1>Change</h1>
     </div> */}

            </Col>

          )}
        </Accordion>
        <Col md="12" >


          <div className="p-4 mb-2 component-shadow bg-light-blue text-center component-border-radius "
            style={{ cursor: "pointer", color: "white" }}
            onClick={() => {
              dispatch({ operation: "CREATE_WALLET", id: -1 });
            }}
          >
            <span className=''>Add wallet</span>
          </div>
        </Col>
      </Row>

    </>
  );
})

export default Wallets