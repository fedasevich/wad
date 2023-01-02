import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Col,Row } from 'react-bootstrap'
import { Context } from '../..'
import { WalletIcon } from '../../ui/Icons/ControlIcons/ControlIcons'
import Modal from '../modal/modal'

const CalculatorWalletModal = observer(({walletModalActive,setWalletModalActive,setSelectedWallet}) => {
    const {wallet} = useContext(Context)
  return (
  
    <Modal active={walletModalActive} setActive={setWalletModalActive} header={"Choose wallet"}>
   <Row>
    <Col md={12}>
        
    {wallet.wallets.map(walletsMap =>
       
       <div className="p-3 mb-2 modal_item" 

     onClick={()=> {
     setSelectedWallet(walletsMap) 
     setWalletModalActive(false)
   } }  
      key={walletsMap.id}>
        <WalletIcon/>
         <h3 className='mt-1'>{walletsMap.name}</h3>
         <h6>{walletsMap.balance} {walletsMap.currency}</h6>
     </div>
     
     )}
    </Col>
   </Row>
    

    </Modal>
  )
})

export default CalculatorWalletModal