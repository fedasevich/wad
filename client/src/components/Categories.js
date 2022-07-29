import React, { useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Context } from '../index';
import Calculator from './calculator/calculator';
import { Navigate} from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { createCategory, fetchCategory } from '../http/categoryApi';
import Modal from './modal/modal';


const Categories = observer(() => {
    const {category,user} = useContext(Context) 
    const [calcActive, setCalcActive] = useState(false)
    const [createCategoryModal, setCreateCategoryModal] = useState(false)
    const [loading,setLoading] = useState(true)
    const [newCategoryName,setNewCategoryName] = useState('')
  useEffect(()=>{
    try {
      fetchCategory().then(data=> category.setCategories(data)).finally(() => setLoading(false))
    } catch(e) {
      alert(e.response.data.message);
    }
 
   
  },[])


  if (loading) {
    return (<h2>loading</h2>)
  }
  





  const logOut= () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
   
    <>
    <Row>
       <h2>Categories:</h2>
   {category.categories.map(categoryMap =>
    <Col md="4" >
     
    <div className="p-4 mb-2 " 
    style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,border:categoryMap.id === category.selectedCategory.id ? '3px solid red' : '3px solid black'}}
      onClick={()=> {category.setSelectedCategory(categoryMap)
      setCalcActive(true)
      } }  
     key={categoryMap.id}>
      
        <h1>{categoryMap.name}</h1>
        <h4>{categoryMap.spent}</h4>
    </div>
    </Col>
    
    )}

<Col md="4" >
     
     <div className="p-4 mb-2 " 
     style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,border: '3px solid green'}}
       onClick={()=> {
          setCreateCategoryModal(true);
       } }  
   >
<h1>+</h1>
     </div>
     </Col>
</Row>
<Calculator active={calcActive} setActive={setCalcActive} category={category}/>
<Button 
    
    onClick={()=> {logOut()
      Navigate(LOGIN_ROUTE)
    }}>Log out</Button>

    <Modal  active={createCategoryModal} setActive={setCreateCategoryModal}>
    <div className="d-flex justify-content-center align-items-center flex-column h-100 " >
    <input  className="mb-2"type="text" name="categoryName" placeholder="Category name..." onChange={e => setNewCategoryName(e.target.value)}/>
    <Button onClick={()=> {
      if(!newCategoryName) {
        return alert("name can't be empty")
      }
    
      


      try {
        createCategory(newCategoryName).
        then(data=> {
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
    </>
  );
});

export default Categories