import React, { useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Context } from '../index';
import Calculator from './calculator/calculator';
import { Navigate} from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';

import { createCategory, fetchCategory, fetchCategoryPeriod, resetAllCategories } from '../http/categoryApi';
import Modal from './modal/modal';
//date
import { addDays } from 'date-fns';
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { runInAction } from 'mobx';
import {AllIcons, Icons} from './Icons/CategoryIcons'

const Categories = observer(() => {
    const {category,user} = useContext(Context) 
    const [calcActive, setCalcActive] = useState(false)
    const [createCategoryModal, setCreateCategoryModal] = useState(false)
    const [loading,setLoading] = useState(true)
    const [newCategoryName,setNewCategoryName] = useState('')
    const [resetCategoriesModal, setResetCategoriesModal] = useState(false)
    const [datePickerModal, setDatePickerModal] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState([])
    const [dateRange, setDateRange] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ]);


  useEffect(()=>{
    const date = new Date()
   
    try {
      fetchCategory().then(data=> category.setCategories(data)).finally(() => setLoading(false))
    } catch(e) {
      alert(e.response.data.message);
    }
   setResetCategoriesModal(date.getDate() === 1 ? true : false)
   
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
       <Button onClick={()=> {
       setDatePickerModal(true)
      
       }}>test</Button>
   {category.categories.map(categoryMap =>
    <Col md="4" >
     
    <div className="p-4 mb-2 " 
    style={{ cursor: "pointer", borderRadius: "400px",backgroundColor: "lightblue",textAlign:"center" ,border:categoryMap.id === category.selectedCategory.id ? '3px solid red' : '3px solid black'}}
      onClick={()=> {category.setSelectedCategory(categoryMap)
      setCalcActive(true)
      } }  
     key={categoryMap.id}>
<Icons iconId={categoryMap.iconId}></Icons>


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
    <AllIcons selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon}></AllIcons>
    <Button onClick={()=> {
      if(!newCategoryName ) {
        return alert("name can't be empty")
      }
      if(!selectedIcon) {
        return alert("please select icon")
      }
    
      


      try {
        createCategory(newCategoryName,selectedIcon.id).
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
    


 {resetCategoriesModal ? <Modal active={resetCategoriesModal} setActive={setResetCategoriesModal}>
      <div className='d-flex justify-content-center align-items-center flex-column'> <h2 className='mb-2'>It's first day of month do you want to reset all categories?</h2>
      
      
      <Button onClick={()=>{ 

      resetAllCategories().
        then(data=> {
          category.setCategories(data)
          setResetCategoriesModal(false)
        })
      }}>Reset categories</Button></div>
     
    </Modal>
    :
    null
    }


<Modal active={datePickerModal} setActive={setDatePickerModal}>
<DateRangePicker
    onChange={item => setDateRange([item.selection])}
    showSelectionPreview={true}
    moveRangeOnFirstSelection={false}
    months={2}
    ranges={dateRange}
    direction="horizontal"
    preventSnapRefocus={true}
    calendarFocus="backwards"
  />
 {/* idk how to make it better */}
  <Button onClick={()=>{
       try {
        fetchCategoryPeriod(dateRange[0].startDate.toISOString(),dateRange[0].endDate.toISOString()).then(data => 
         { 
          if(!data) {
            return
          }
          runInAction(() =>
          { 
          category.categories.forEach(categoryMap =>{
            categoryMap.spent = 0;
          })
          data.rows.forEach(dataMap=> {
          category.categories.map(categoryMap =>{
  
            if(dataMap.categoryId===categoryMap.id){
              categoryMap.spent += parseFloat(dataMap.sum)
            }
             }
            )
            })
        })}).finally(() => setDatePickerModal(false))
      } catch(e) {
        alert(e.response.data.message);
      }
  }}>Submit</Button>
</Modal>


    </>
  );
});

export default Categories