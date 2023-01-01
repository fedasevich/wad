import React, { useContext, useState, } from 'react'
import { Context } from '../..'


import {DispatchContext} from '../../pages/MainPage';
import { DeleteIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import Currencies from '../Currencies';
import MenuProvider from '../MenuProvider'




const EditWallet = ({id}) => {
  const [editWallet, setEditWallet] = useState({
    name: "",
    currency: "",
    balance:"",
  })
  const { wallet } = useContext(Context)
  const dispatch = useContext(DispatchContext)


const eraseState=()=>{
  setEditWallet({ name: "",
  currency: "",
  balance:"",})
}

const handleClose = ()=> {

  dispatch({ operation: "DEFAULT_WALLET", id:-1 })
}



const handleCommit = ()=> {
  wallet.editWallet(id,editWallet.currency,editWallet.name,editWallet.balance)
  eraseState()
  handleClose()
}

const handleKeyDown = event => {
  if (event.key === 'Enter') {
    handleCommit()
  }
  if (event.key === 'Escape') {
    handleClose()
  }
};

const handleChange=(event)=> {
  setEditWallet({
    ...editWallet,
    [event.target.name]: event.target.value
  });
 
}

const handleDoubleClick=(id)=> {

  wallet.deleteWallet(id)
  eraseState()
  handleClose()
}

  return (
    <>
  <MenuProvider>
    <MenuProvider.Actions close={handleClose} commit={handleCommit}>
      <h5>Edit wallet</h5> 
      <h6>Wallet: {wallet.getWalletById(id).name}</h6>
      </MenuProvider.Actions>
    
    <MenuProvider.Container className="d-flex flex-column">
      <label className='mb-2' htmlFor="name">Enter new name:</label>
      <input className='mb-2 component-half-border-radius' type="text" name='name' onKeyDown={handleKeyDown} value={editWallet.name} onChange={handleChange}/>


      <label className='mb-2' htmlFor="balance">Enter new balance:</label>
      <input className='mb-2 component-half-border-radius' type="number" name='balance' onKeyDown={handleKeyDown} value={editWallet.balance} onChange={handleChange}/>
      <h4 className='mb-2' >Choose new currency:</h4>
   <Currencies setCurrency={handleChange} />

   <h6 onDoubleClick={()=>handleDoubleClick(id)} className='text-danger mb-0 btn' ><DeleteIcon/> Delete wallet</h6>
       </MenuProvider.Container>
  </MenuProvider> 
  </>
  )

   
    

}

export default EditWallet