import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Modal from '../components/modal/modal'
import NavBar from '../components/NavBar'
import { changeWallet, createWallet, deleteWallet, fetchWallet } from '../http/walletApi'
import { Context } from '../index'

const Wallet = observer (() => {
  const {wallet} = useContext(Context) 
  const [loading,setLoading] = useState(true)
  const [changeWalletModal,setChangeWalletModal] = useState(false)
  const [createWalletModal, setCreateWalletModal] = useState(false)
  const [createWalletName,setCreateWalletName] = useState('')
  const [selectedWallet, setSelectedWallet] = useState({})
  const [createWalletCurrency,setCreateWalletCurrency] = useState('')
  const [newBalance, setNewBalance] = useState('')
  const [newCurrency, setNewCurrency] = useState('')
  const [newName, setNewName] = useState('')
  useEffect(()=>{
    if(wallet.wallets.length !== 0) { 
      setLoading(false)
     }
    if(wallet.wallets.length === 0) {  
      try {
      fetchWallet().then(data=> {wallet.setWallet(data) 
        wallet.setSelectedWallet(data[0])
        setLoading(false)
        })
      } catch(e) {
        alert(e.response.data.message);
      }
  
 
  }
    },[])



    if (loading) {
      return (<h2>loading</h2>)
    }

    const handleClickOnWalletToChange = (Wallet) => {
      setSelectedWallet(Wallet)
      setChangeWalletModal(true)
        }


    return (
 
      <>
       <Container>
       <NavBar/>
      <Row>
         <h2>Wallets:</h2>
     {wallet.wallets.map(walletsMap =>
      <Col md="4" >
       
      <div className="p-4 mb-2 " 
      style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,
      border:walletsMap.id === wallet.selectedWallet.id ? '3px solid red' : '3px solid black'}}
      onClick={()=>  handleClickOnWalletToChange(walletsMap) }  
       key={walletsMap.id}>
         
          <h1>{walletsMap.name}</h1>
          <h4>{walletsMap.balance} {walletsMap.currency}</h4>
      </div>
      </Col>
      
      )}

   
   <div className="p-4 mb-2 " 
   style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,border: '3px solid green'}}
     onClick={()=> {
        setCreateWalletModal(true);
     } }  
 >
<h1>+</h1>
   </div>

  </Row>
  </Container>
  <Modal  active={createWalletModal} setActive={setCreateWalletModal}>
  <div className="d-flex justify-content-center align-items-center flex-column h-100 " >
  <input  className="mb-2" type="text" name="WalletName" placeholder="Wallet name..." onChange={e => setCreateWalletName(e.target.value)} value={createWalletName}/>
  <input  className="mb-2" type="text" name="WaleltCurrency" placeholder="Wallet Currency..." onChange={e => setCreateWalletCurrency(e.target.value)} value={createWalletCurrency}/>
  <Button onClick={()=> {
    if(!createWalletName || !createWalletCurrency) {
      return alert("Inputs can't be empty")
    }
    
 


    try {
      createWallet(createWalletName,createWalletCurrency).
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

  <Modal active={changeWalletModal} setActive={setChangeWalletModal}>
<h2>Change wallet:</h2>
<div className="d-flex flex-column align-items-center">
<input  className="mb-2" type="text" name="newBalance" placeholder="New balance..." value={newBalance}
         onChange={e => setNewBalance(e.target.value)}/>
<input  className="mb-2" type="text" name="newSpent" placeholder="New currency..." value={newCurrency}
         onChange={e => setNewCurrency(e.target.value)}/>
        <input  className="mb-2" type="text" name="newName" placeholder="New name..." value={newName}
         onChange={e => setNewName(e.target.value)}/>

         <Button className='mb-2' onClick={()=> { 
          if(!newCurrency && !newName && !newBalance) {
            return alert(`Not enough data`)
          }
          try {
            changeWallet(selectedWallet.id,newName?newName:null,newBalance ? parseFloat(newBalance):null,newCurrency ? parseFloat(newCurrency):null).
            then(()=> {
              runInAction(() =>
              { 
                const walletIndex = wallet.wallets.findIndex(wallet => wallet.id === selectedWallet.id)
                if(newName) {
                  wallet.wallets[walletIndex].name = newName 
                }
                if(newBalance) {
                  wallet.wallets[walletIndex].balance = newBalance 
                }
                if(newCurrency) {
                  wallet.wallets[walletIndex].currency = newCurrency
                }
            
             })
             setChangeWalletModal(false)
            })
          } catch(e) {
            alert(e.response.data.message);
          }

}
         }>Apply changes</Button>
         <Button className="btn-danger" onClick={()=> {
          try {
            deleteWallet(selectedWallet.id).then(() => {
              const walletIndex = wallet.wallets.findIndex(wallet => wallet.id === selectedWallet.id)
            
          wallet.wallets.splice(walletIndex, 1)
              setChangeWalletModal(false)
            })
          }catch(e) {
            alert(e.response.data.message);
          }
        
         
         }}>Delete Wallet</Button>
         </div>
 </Modal>
      </>
    );
})

export default Wallet