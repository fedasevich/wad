import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import { fetchWalletTransactionByWalletId } from '../../http/transactionApi'
import MenuProvider from '../MenuProvider'
import Transactions from '../transaction/Transactions'
import TransactionsWallet from '../transaction/TransactionsWallet'

const WalletTransactions = observer(({id}) => {
    const { wallet,category } = useContext(Context)


    useEffect(()=>{
      try {
        fetchWalletTransactionByWalletId(category.transactionsPage,category.transactionsLimit,category.transactionsSort,id).
        then(data=> {
          category.setTransactions(data.rows)    
         
      })
      } catch(e) {
        alert(e.response.data.message);
      }
     
  
    },[id])

    return (
   <>
   <MenuProvider>
    <MenuProvider.Header.Rounded>
      <h5>Transactions</h5> 
      <h6>Wallet: {wallet.getWalletById(id).name}</h6>
      </MenuProvider.Header.Rounded>
    
    <MenuProvider.Container className="d-flex flex-column">
      <TransactionsWallet id={id}/>
       </MenuProvider.Container>
  </MenuProvider> 
   </>
  )
})

export default WalletTransactions