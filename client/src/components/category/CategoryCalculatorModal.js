import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'
import React, { Suspense, lazy } from 'react'
import MenuProvider from '../MenuProvider'
import Modal from '../modal/modal'

const Calculator = lazy(() => import('../calculator/calculator'))

const CategoryCalculatorModal = observer(({ categoryId, calculatorModal, setCalculatorModal }) => {

  const handleClose = () => {
    setCalculatorModal(false)
  }

  return (
    <Modal active={calculatorModal} setActive={setCalculatorModal}>
      <MenuProvider.Header.Straight>
        <h2>Categories</h2>
      </MenuProvider.Header.Straight>
      <Suspense fallback={<h2>Loading</h2>}>
        <Calculator categoryId={categoryId} onSubmit={handleClose} />
      </Suspense>
      <h6 className='text-center py-2 fw-light'> {format(new Date(), 'd MMMM y')}</h6>
    </Modal>
  )
})

export default CategoryCalculatorModal