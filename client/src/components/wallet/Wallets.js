import React, { useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Card, Col, Row, Button, Accordion, useAccordionButton } from 'react-bootstrap';
import { Context } from '../../index';
import { createWallet, fetchWallet } from '../../http/walletApi';
import Modal from '../modal/modal';



function WalletToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <div
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

const Wallets = observer(({dispatch}) => {
    const {wallet} = useContext(Context) 
    const [createWalletModal, setCreateWalletModal] = useState(false)

    useEffect(()=>{
        try {
          fetchWallet().then(data=> {wallet.setWallet(data) 
          wallet.setSelectedWallet(data[0])
          })
        } catch(e) {
          alert(e.response.data.message);
        }
      },[])
    return (
   
        <>
        <Row>
           <h2>Wallets:</h2>
       {wallet.wallets.map(walletsMap =>
        <Col md="12" >
  <Accordion >
      <Card>
        <Card.Header>
          <WalletToggle eventKey="0"> <h1>{walletsMap.name}</h1>
            <h4>{walletsMap.balance} {walletsMap.currency}</h4></WalletToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
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
        <Col md="4" >
     

     <div className="p-4 mb-2 " 
     style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,border: '3px solid green'}}
       onClick={()=> {
          setCreateWalletModal(true);
       } }  
   >
<h1>+</h1>
     </div>
     </Col>
    </Row>
    
        </>
      );
})

export default Wallets