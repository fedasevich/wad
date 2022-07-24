import React, { useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Card, Col, Row } from 'react-bootstrap';
import { Context } from '../index';
import { fetchWallet } from '../http/walletApi';

const Wallets = observer(() => {
    const {wallet} = useContext(Context) 
    useEffect(()=>{
        try {
          fetchWallet().then(data=> wallet.setWallet(data))
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
    </Row>
        </>
      );
})

export default Wallets