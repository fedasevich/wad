import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useStore } from '../../store'
import MenuProvider from '../MenuProvider'
import Modal from '../modal/modal'

const CalculatorCategoryModal = observer(({ categoryModalActive, setCategoryModalActive, setSelectedCategory }) => {
  const { category } = useStore()
  return (
    <Modal active={categoryModalActive} setActive={setCategoryModalActive}>

      <MenuProvider.Header>
        <h2>Choose category</h2>

      </MenuProvider.Header>
      <MenuProvider.Container>
        <Row>
          <Col md={12} className="overflow-auto vh-50 ">
            {category.categories.map(categoryMap =>


              <div className="p-3 mb-2 modal_item"
                onClick={() => {
                  setSelectedCategory(categoryMap)
                  setCategoryModalActive(false)
                }}
                key={categoryMap.id}>

                <h3 className='mt-1'>{categoryMap.name}</h3>
                <h6>{categoryMap.spent}</h6>
              </div>


            )}
          </Col>
        </Row>

      </MenuProvider.Container>




    </Modal>
  )
})

export default CalculatorCategoryModal