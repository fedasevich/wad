import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Col,Row } from 'react-bootstrap'
import { Context } from '../..'
import { WalletIcon } from '../../ui/Icons/ControlIcons/ControlIcons'
import Modal from '../modal/modal'

const CalculatorCategoryModal = observer(({categoryModalActive,setCategoryModalActive,setSelectedCategory}) => {
    const {category} = useContext(Context)
  return (
    <Modal active={categoryModalActive} setActive={setCategoryModalActive}  header={"Choose category"}>

   <Row>
    <Col md={12} className="overflow-auto vh-50 ">
    {category.categories.map(categoryMap =>
    
     
    <div className="p-3 mb-2 modal_item" 
      onClick={()=> {
        setSelectedCategory(categoryMap)
        setCategoryModalActive(false)
      } }  
     key={categoryMap.id}>
      
        <h3 className='mt-1'>{categoryMap.name}</h3>
        <h6>{categoryMap.spent}</h6>
    </div>
    
    
    )}
    </Col>
   </Row>
    

    </Modal>
  )
})

export default CalculatorCategoryModal