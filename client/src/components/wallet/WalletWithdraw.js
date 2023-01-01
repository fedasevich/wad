import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../..'
import Calculator from '../calculator/calculator'
import MenuProvider from '../MenuProvider'

const WalletWithdraw = observer(({id}) => {
    const {wallet} = useContext(Context)
  return (
    <MenuProvider>
    <MenuProvider.Header.Straight>
      <h5>Withdraw</h5> 
      <h6> {wallet.getWalletById(id).name}</h6>
      </MenuProvider.Header.Straight>
    

     <Calculator id={id}/>
    <h6 className='text-center py-2 fw-light'> {format( new Date(),'d MMMM y')}</h6>
  </MenuProvider> 
  )
})

export default WalletWithdraw