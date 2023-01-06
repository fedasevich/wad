import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons'
import { SettingsBackgroundIcon } from '../../ui/Icons/ControlIcons/ControlIcons'
import MenuProvider from '../MenuProvider'
import Modal from '../modal/modal'

const CategoryOtherCategoryModal = observer(({otherCategories,otherCategoriesModal,setOtherCategoriesModal,setCalculatorModal,dispatch,handleGearClick}) => {

  return (

    <Modal active={otherCategoriesModal} setActive={setOtherCategoriesModal}  >
<MenuProvider.Header>
      <h2>Choose category</h2> 

      </MenuProvider.Header>
      <MenuProvider.Container>
      <Row>
     <Col md={12} className="overflow-auto vh-50 ">
     {otherCategories.map(categoryMap =>
     
      
     <div className="p-3 mb-2 modal_item d-flex flex-row justify-content-between category align-items-center" 
       onClick={()=> {
        setCalculatorModal({active:true,categoryId:categoryMap.id})
        setOtherCategoriesModal(false)
       } }  
      key={categoryMap.id}>
         <div className=' position-relative categoryIcon'>
            <Icons iconId={categoryMap.iconId}></Icons>
            <span className="position-absolute top-0 start-100 translate-middle p-2 gear" onClick={(event)=>{ 
              handleGearClick(event,categoryMap.id) }}>
            <SettingsBackgroundIcon/>
  </span>
            </div>
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