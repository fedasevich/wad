import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Context } from '../index'
import Categories from '../components/Categories'
import NavBar from '../components/NavBar'
import Transactions from '../components/Transactions'
import { changeCategory, createCategory, fetchCategory } from '../http/categoryApi'
import Modal from '../components/modal/modal'
import { observer } from 'mobx-react-lite'
import { runInAction } from 'mobx'

const Category = observer(() => {
  const {category} = useContext(Context) 
  const [loading,setLoading] = useState(true)
  const [createCategoryModal, setCreateCategoryModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState({})
  const [newCategoryName,setNewCategoryName] = useState('')
  const [changeCategoryModal,setChangeCategoryModal] = useState(false)
  const [newSpent,setNewSpent] = useState('')
  const [newName,setNewName] = useState('')


  useEffect(()=>{
    if(category.categories.length === 0) {  
        try {
          fetchCategory().then(data=> category.setCategories(data)).finally(() => {setLoading(false)
          
          })
        } catch(e) {
          alert(e.response.data.message);
        }
    }
    if(category.categories.length !== 0) { 
      setLoading(false)
     }
  },[])

  if (loading) {
    return (<h2>loading</h2>)
  }
  
  function handleClickOnCategoryToChange(category) {
setSelectedCategory(category)
setChangeCategoryModal(true)
  }

  return (
    <>
    <Container>
   <NavBar/>
   <Row>
   <h2>Categories:</h2>
   {category.categories.map(categoryMap =>
    <Col md="4" >
     
    <div className="p-4 mb-2 " 
    style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,border:'3px solid black'}}
      onClick={()=> {
        handleClickOnCategoryToChange(categoryMap)
    console.log(categoryMap.id)
      } }  
     key={categoryMap.id}>
      
        <h1>{categoryMap.name}</h1>
        <h4>{categoryMap.spent}</h4>
    </div>
    </Col>
   
    )}
     <div className="p-4 mb-2 " 
     style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,border: '3px solid green'}}
       onClick={()=> {
          setCreateCategoryModal(true);
       } }  
   >
<h1>+</h1>
     </div>
 </Row>
 
 <Modal active={changeCategoryModal} setActive={setChangeCategoryModal}>
<h2>Change category:</h2>
<div className="d-flex flex-column align-items-center">
<input  className="mb-2" type="text" name="newSpent" placeholder="New spent..." value={newSpent}
         onChange={e => setNewSpent(e.target.value)}/>

        <input  className="mb-2" type="text" name="newName" placeholder="New name..." value={newName}
         onChange={e => setNewName(e.target.value)}/>
         <Button className='mb-2' onClick={()=> { 
          if(!newSpent && !newName) {
            return alert(`Not enough data`)
          }
          try {
            changeCategory(selectedCategory.id,newSpent ? parseFloat(newSpent):null,newName?newName:null).
            then(()=> {
              runInAction(() =>
              { 
                const categoryIndex = category.categories.findIndex(category => category.id === selectedCategory.id)
                if(newName) {
                  category.categories[categoryIndex].name = newName 
                }
                if(newSpent) {
                  category.categories[categoryIndex].spent = newSpent 
                }
            
             })
             setChangeCategoryModal(false)
            })
          } catch(e) {
            alert(e.response.data.message);
          }

}
         }>Apply changes</Button>
         <Button className="btn-danger">Delete category</Button>
         </div>
 </Modal>


 <Modal  active={createCategoryModal} setActive={setCreateCategoryModal}>
    <div className="d-flex justify-content-center align-items-center flex-column h-100 " >
    <input  className="mb-2"type="text" name="categoryName" placeholder="Category name..." onChange={e => setNewCategoryName(e.target.value)}/>
    <Button onClick={()=> {
      if(!newCategoryName) {
        return alert("name can't be empty")
      }
    
      


      try {
        createCategory(newCategoryName).then(data=> {
          category.categories.push(data)
          setCreateCategoryModal(false)
        })
      } catch(e) {
        alert(e.response.data.message);
      }
    }}>
      Create category</Button>
      </div>
    </Modal>
   </Container>
  </>
  )
})

export default Category