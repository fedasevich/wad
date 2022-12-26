import React, { useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Context } from '../../index';
import { createWallet, fetchWallet } from '../../http/walletApi';
import Modal from '../modal/modal';

const Wallets = observer(() => {
    const {wallet} = useContext(Context) 
    const [createWalletModal, setCreateWalletModal] = useState(false)
    const [newWalletName,setNewWalletName] = useState('')
    const [newWalletCurrency,setNewWalletCurrency] = useState('')
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
        <Col md="4" >
         
        <div className="p-4 mb-2 " 
        style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,
        border:walletsMap.id === wallet.selectedWallet.id ? '3px solid red' : '3px solid black'}}
        onClick={()=> wallet.setSelectedWallet(walletsMap) }  
         key={walletsMap.id}>
           
            <h1>{walletsMap.name}</h1>
            <h4>{walletsMap.balance} {walletsMap.currency}</h4>
        </div>
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
    <Modal  active={createWalletModal} setActive={setCreateWalletModal}>
    <div className="d-flex justify-content-center align-items-center flex-column h-100 " >
    <input  className="mb-2" type="text" name="WalletName" placeholder="Wallet name..." onChange={e => setNewWalletName(e.target.value)}/>
    <input  className="mb-2" type="text" name="WaleltCurrency" placeholder="Wallet Currency..." onChange={e => setNewWalletCurrency(e.target.value)}/>
    <Button onClick={()=> {
      if(!newWalletName || !newWalletCurrency) {
        return alert("Inputs can't be empty")
      }
      
   


      try {
        createWallet(newWalletName,newWalletCurrency).
        then(data=> {
          wallet.wallets.push(data)
          setCreateWalletModal(false)
        })
      } catch(e) {
        alert(e.response.data.message);
      }
    }}>
      Create wallet</Button>
      </div>
    </Modal>
        </>
      );
})

export default Wallets