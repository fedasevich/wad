import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Context } from '../..'
import { CategoryDispatchContext } from '../../pages/Category'
import { AllIcons } from '../../ui/Icons/CategoryIcons/CategoryIcons'
import MenuProvider from '../MenuProvider'

const CreateCategory = observer(() => {
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategorySelectedIcon, setNewCategorySelectedIcon] = useState({})
  const { category } = useContext(Context)
  const dispatch = useContext(CategoryDispatchContext)

  const handleClose = () => {
    dispatch({ operation: null })
  }

  const handleCommit = async () => {
    if (!newCategoryName) {
      return alert("name can't be empty")
    }
    if (!newCategorySelectedIcon) {
      return alert("please select icon")
    }
    await category.createCategory(newCategoryName, newCategorySelectedIcon).finally(() => {
      handleClose()
    })
  }

  return (
    <>
      <Col xl={{ span: 5, offset: 1 }}>
        <MenuProvider>
          <MenuProvider.Actions close={handleClose} commit={handleCommit}>
            <h4>Create category</h4>
          </MenuProvider.Actions>
          <MenuProvider.Container>
            <label className='mb-2' htmlFor="name">Enter name:</label>
            <input className='mb-3 component-half-border-radius' type="text" name='name' value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
            <div className='d-flex align-items-center'>
              <h4 className='me-2' >Chosen icon: </h4>
              <div className="bg-main-blue component-one-third-border-radius">{newCategorySelectedIcon.svg}</div>
            </div>

          </MenuProvider.Container>
        </MenuProvider>
      </Col>

      <Col xl={{ span: 5, offset: 1 }}>
        <MenuProvider>
          <MenuProvider.Header>
            <h2>Select icon</h2>
          </MenuProvider.Header>
          <MenuProvider.Container>
            <AllIcons selectedIcon={newCategorySelectedIcon} setSelectedIcon={setNewCategorySelectedIcon}></AllIcons>
          </MenuProvider.Container>
        </MenuProvider>

      </Col>
    </>
  )
})

export default CreateCategory