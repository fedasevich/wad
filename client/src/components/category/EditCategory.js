import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Context } from '../..'
import { changeCategory } from '../../http/categoryApi'
import { AllIcons } from '../../ui/Icons/CategoryIcons/CategoryIcons'
import MenuProvider from '../MenuProvider'

const EditCategory = observer(({ id, dispatch }) => {

  const [editCategory, setEditCategory] = useState({ name: "", spent: "", icon: {} })

  const { category } = useContext(Context)


  const handleClose = () => {
    dispatch({ operation: null })
  }

  const handleCommit = () => {
    category.changeCategory(id, editCategory)
    
    handleClose()
 
  }



  const handleEditCategoryNameChange = (value) => {
    setEditCategory({ ...editCategory, ["name"]: value })
  }


  const handleEditCategorySpentChange = (value) => {
    setEditCategory({ ...editCategory, ["spent"]: parseFloat(value)})
  }

  const handleEditCategoryIconChange = (value) => {
    setEditCategory({ ...editCategory, ["icon"]: value })
  }

  return (

    <>
      <Col xl={{ span: 5, offset: 1 }}>
        <MenuProvider>
          <MenuProvider.Actions close={handleClose} commit={handleCommit}>
            <h4>Edit category</h4>
            <h6>Category: {category.getCategoryById(id).name}</h6>
          </MenuProvider.Actions>
          <MenuProvider.Container>
            <label className='mb-2' htmlFor="name">Enter name:</label>
            <input className='mb-3 component-half-border-radius' type="text" name='name' value={editCategory.name} onChange={e => handleEditCategoryNameChange(e.target.value)} />
            <label className='mb-2' htmlFor="spent">Enter spent:</label>
            <input className='mb-3 component-half-border-radius' type="number" name='spent' value={editCategory.spent} onChange={e => handleEditCategorySpentChange(e.target.valueAsNumber)} />
            <div className='d-flex align-items-center'>
              <h4 className='me-2' >Chosen icon: </h4>
              <div className="bg-main-blue component-one-third-border-radius">{editCategory.icon?.svg}</div>
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
            <AllIcons selectedIcon={editCategory.icon} setSelectedIcon={handleEditCategoryIconChange}></AllIcons>
          </MenuProvider.Container>
        </MenuProvider>

      </Col>
    </>



    //      <Modal active={changeCategoryModal} setActive={setChangeCategoryModal}>
    // <h2>Change category:</h2>
    // <div className="d-flex flex-column align-items-center">
    // <input  className="mb-2" type="text" name="newSpent" placeholder="New spent..." value={newSpent}
    //          onChange={e => setNewSpent(e.target.value)}/>

    //         <input  className="mb-2" type="text" name="newName" placeholder="New name..." value={newName}
    //          onChange={e => setNewName(e.target.value)}/>

    // <AllIcons selectedIcon={newSelectedIcon} setSelectedIcon={setNewSelectedIcon}></AllIcons>
    //          <Button className='mb-2' onClick={()=> { 
    //           if(!newSpent && !newName && !newSelectedIcon) {
    //             return alert(`Not enough data`)
    //           }
    //           try {
    //             changeCategory(selectedCategory.id,newSpent ? parseFloat(newSpent):null,newName?newName:null,newSelectedIcon.id?newSelectedIcon.id:null).
    //             then(()=> {
    //               runInAction(() =>
    //               { 
    //                 const categoryIndex = category.categories.findIndex(category => category.id === selectedCategory.id)
    //                 if(newName) {
    //                   category.categories[categoryIndex].name = newName 
    //                 }
    //                 if(newSpent) {
    //                   category.categories[categoryIndex].spent = newSpent 
    //                 }
    //                 if(newSelectedIcon.id) {
    //                   category.categories[categoryIndex].iconId =  newSelectedIcon.id
    //                 }
    //             setNewSelectedIcon({})
    //             setNewSpent('')
    //             setNewName('')
    //              })
    //              setChangeCategoryModal(false)
    //             })
    //           } catch(e) {
    //             alert(e.response.data.message);
    //           }

    // }
    //          }>Apply changes</Button>
    //          <Button className="btn-danger"onClick={()=> { 
    //             try {
    //               deleteCategory(selectedCategory.id).
    //               then(()=> {
    //                 runInAction(() =>
    //                 { 
    //                   const categoryIndex = category.categories.findIndex(category => category.id === selectedCategory.id)
    //                   category.categories.splice(categoryIndex, 1)
    //                })
    //                setChangeCategoryModal(false)
    //               })
    //             } catch(e) {
    //               alert(e.response.data.message);
    //             }
    //          }}>Delete category</Button>
    //          </div>
    //  </Modal>
  )
})

export default EditCategory