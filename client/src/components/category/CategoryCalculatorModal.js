import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons'
import Calculator from '../calculator/calculator'
import MenuProvider from '../MenuProvider'
import Modal from '../modal/modal'

const CategoryCalculatorModal = observer(({categoryId,calculatorModal,setCalculatorModal}) => {

  return (

    <Modal active={calculatorModal} setActive={setCalculatorModal}>
    <MenuProvider.Header.Straight>
      <h2>Categories</h2> 

      </MenuProvider.Header.Straight>
 
      <Calculator categoryId={categoryId}/>
  <h6 className='text-center py-2 fw-light'> {format( new Date(),'d MMMM y')}</h6>
      

 
     </Modal>

  )
})

export default CategoryCalculatorModal