import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons'
import MenuProvider from '../MenuProvider'
import Modal from '../modal/modal'

const CategoryOtherCategoryModal = observer(({otherCategories,otherCategoriesModal,setOtherCategoriesModal,setCalculatorModal,dispatch}) => {

  return (

    <Modal active={otherCategoriesModal} setActive={setOtherCategoriesModal}  >
<MenuProvider.Header>
      <h2>Choose category</h2> 

      </MenuProvider.Header>
      <MenuProvider.Container>
      <Row>
     <Col md={12} className="overflow-auto vh-50 ">
     {otherCategories.map(categoryMap =>
     
      
     <div className="p-3 mb-2 modal_item d-flex flex-row justify-content-between" 
       onClick={()=> {
        setCalculatorModal({active:true,categoryId:categoryMap.id})
        setOtherCategoriesModal(false)
       } }  
      key={categoryMap.id}>
        <Icons iconId={categoryMap.iconId}/>
         <h3 className='mt-1'>{categoryMap.name}</h3>
         <h6>{categoryMap.spent}</h6>
     </div>
     
     
     )}
      <div className="p-3 mb-2 modal_item bg-main-blue component-border-radius d-flex flex-row justify-content-center" 
       onClick={()=> {
        dispatch({operation:"CREATE_CATEGORY",dispatch:dispatch});
       } }>
         <h3 className='mt-1'>+</h3>
     </div>
     
     </Col>
    </Row>
      </MenuProvider.Container>

    


   
     
 
     </Modal>

  )
})

export default CategoryOtherCategoryModal