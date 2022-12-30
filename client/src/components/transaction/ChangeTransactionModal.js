import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button} from 'react-bootstrap'
import { changeTransaction } from '../../http/transactionApi'



const ChangeTransactionModal = observer(({category,wallet,changeTransactionModal,setChangeTransactionModal}) => {
    const [newSum,setNewSum] = useState('')
    const [newDescription,setNewDescription] = useState('')
  return (
    <>
    {/* <Modal active={changeTransactionModal} setActive={setChangeTransactionModal}>
    <div className='d-flex flex-row justify-content-between'>

    <h2>{category.selectedTransaction.description}</h2>
    <h2>{category.selectedTransaction.id}</h2>
    <h2>{category.selectedTransaction.sum}</h2>
    </div>
  
    <div className="d-flex align-items-center flex-column ">
    <input  className="mb-2" type="text" name="newSum" placeholder="New sum..." value={newSum}
   onChange={e => setNewSum(e.target.value)}/>

  <input  className="mb-2" type="text" name="newDescription" placeholder="New description..." value={newDescription}
   onChange={e => setNewDescription(e.target.value)}/>


   <Button onClick={()=>{
if(!newSum && !newDescription) {
return alert(`Not enough data`)
}


 try {
  changeTransaction(category.selectedTransaction.id,newSum ? parseFloat(newSum):null,newDescription?newDescription:null).
  then(()=> {
    runInAction(() =>
    { 
      const transactionIndex =  category.transactions.findIndex(transaction => transaction.id === category.selectedTransaction.id)

      if(newSum) {
     
     
     const categoryIndex = category.categories.findIndex(categoryIndex => categoryIndex.id === category.selectedTransaction.categoryId)
     if(category.selectedTransaction.walletId !== -1) 
    {
     const walletIndex = wallet.wallets.findIndex(wallet => wallet.id === category.selectedTransaction.walletId)
     wallet.wallets[walletIndex].balance = (parseFloat(wallet.wallets[walletIndex].balance) + parseFloat(category.selectedTransaction.sum)) - parseFloat(newSum)
    }
     category.categories[categoryIndex].spent = (parseFloat(category.categories[categoryIndex].spent) - parseFloat(category.selectedTransaction.sum)) + parseFloat(newSum)
     category.transactions[transactionIndex].sum = newSum
    
      }
      if(newDescription) {
        category.transactions[transactionIndex].description = newDescription
      }
  
   })

  }).then(()=> {
    setChangeTransactionModal(false)
  })
} catch(e) {
  alert(e.response.data.message);
}

 }}>Save</Button>
    
</div>
</Modal> */}
</>
  )
})

export default ChangeTransactionModal