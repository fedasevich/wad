import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Context } from '../..'
import { changeTransaction } from '../../http/transactionApi'
import MenuProvider from '../MenuProvider'
import Modal from '../modal/modal'



const ChangeTransactionModal = observer(({ changeTransactionModal, setChangeTransactionModal, id }) => {
  const [newSum, setNewSum] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const { wallet, category } = useContext(Context)

  const handleClose = () => {
    setChangeTransactionModal({active:false,id:-1})
  }

  const handleCommit = () => {
  category.changeTransaction(id,newSum,newDescription,wallet)
  handleClose()
  }

const selectedTransaction =  category.getTransactionById(id);

  return (
    <>
      <Modal active={changeTransactionModal} setActive={setChangeTransactionModal}>
        <MenuProvider>
          <MenuProvider.Actions close={handleClose} commit={handleCommit}>
            <h4>Change transaction</h4>
            <h6>Description: {selectedTransaction?.description}</h6>
            <h6>Id: {selectedTransaction?.id}</h6>
            <h6>Sum: {selectedTransaction?.sum}</h6>
           
          </MenuProvider.Actions>
          <MenuProvider.Container>
            <div className="d-flex align-items-center flex-column ">

            <label className='mb-2' htmlFor="name">Enter new description:</label>
            <input className='mb-3 component-half-border-radius' type="text" name='description' id="description" value={newDescription} onChange={e => setNewDescription(e.target.value)} />
            <label className='mb-2' htmlFor="spent">Enter spent:</label>
            <input className='mb-3 component-half-border-radius' type="number" name='spent' is="spent" value={newSum} onChange={e => setNewSum(e.target.value)} />
        

            </div>
          </MenuProvider.Container>
        </MenuProvider>

      </Modal>
    </>
  )
})

export default ChangeTransactionModal