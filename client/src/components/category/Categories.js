import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Context } from '../../index';
import Calculator from '../calculator/calculator';
import { Navigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';

import { createCategory, fetchCategory, fetchCategoryPeriod, resetAllCategories } from '../../http/categoryApi';
import Modal from '../modal/modal';
//date
import { addDays, endOfMonth, startOfMonth } from 'date-fns';
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { runInAction } from 'mobx';
import { AllIcons, Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons'
import "./CategoryStyle.css"
import CategoryOtherCategoryModal from './CategoryOtherCategoryModal';
import CategoryCalculatorModal from './CategoryCalculatorModal';
import { SettingsBackgroundIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import DatePickerProvider from '../DatePickerProvider';



const MAIN_CATEGORIES_LENGTH = 7

const Categories = observer(({dispatch}) => {
  const { category} = useContext(Context)
  const [calculatorModal, setCalculatorModal] = useState({
    active: false,
    categoryId:null,
  })
  const [createCategoryModal, setCreateCategoryModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [resetCategoriesModal, setResetCategoriesModal] = useState(false)
 
  const [selectedIcon, setSelectedIcon] = useState([])
  const [otherCategoriesModal, setOtherCategoriesModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState("January 2023")
  const [dateRange, setDateRange] = useState([
    {
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date(),),
      key: 'selection',
      action: 'month'
    }
  ]);


  useEffect(() => {
    const date = new Date()

    try {
      fetchCategory().then(data => 
        runInAction(() => {
          category.setCategories(data)

        })
        
        ).finally(() => setLoading(false))
    } catch (e) {
      alert(e.response.data.message);
    }
    //  setResetCategoriesModal(date.getDate() === 1 ? true : false)

  }, [])


  if (loading) {
    return (<h2>loading</h2>)
  }


  const [firstCategories, otherCategories] = [category.categories.slice(0, MAIN_CATEGORIES_LENGTH),
  category.categories.slice(MAIN_CATEGORIES_LENGTH, category.categories.length)];

const handlePlusClick=()=>{
 dispatch({operation:"CREATE_CATEGORY",dispatch:dispatch});
} 


const handleGearClick=(event,id)=>{
  event.stopPropagation()
  dispatch({operation:"EDIT_CATEGORY",dispatch:dispatch,id:id});
 } 


const handleThreeDotsClick=()=>{
  setOtherCategoriesModal(true)
}


const handleCalculatorModalChange=({categoryId,active})=> {
  setCalculatorModal({
    ...calculatorModal,
    categoryId: categoryId,
    active:active,
  });
 
}

  return (


    <>
                  <Row>
                <Col xs={{span:4,offset:1}} xl={{ span: 4, offset: 1 }}>
                  <h1 className='mt-5 mb-5 fw-bold'>Categories</h1>
                </Col>
              <Col xs={{span:4,offset:3}} xl={{span:4,offset:3}}>
              <DatePickerProvider dateRange={dateRange} setDateRange={setDateRange}/>
              </Col>
              </Row>
      <div className="categories">


        {/* <Button onClick={()=> {
       setDatePickerModal(true)
      
       }}>test</Button> */}
        {firstCategories.map(categoryMap =>


          <div className="category p-1 mb-2 d-flex flex-column align-items-center cursor-pointer position-relative "
            onClick={() => {
              setCalculatorModal({active:true,categoryId:categoryMap.id})
            }}
            key={categoryMap.id}>



            <h4 className='mb-3 fw-medium'>{categoryMap.name}</h4>
            <div className=' position-relative categoryIcon'>
            <Icons iconId={categoryMap.iconId}></Icons>
            <span className="position-absolute top-0 start-100 translate-middle p-2 gear" onClick={(event)=>{ 
              handleGearClick(event,categoryMap.id) }}>
            <SettingsBackgroundIcon/>
  </span>
            </div>
           
            <h4 className='mt-3 fw-bold'>{categoryMap.spent}</h4>
           
          </div>


        )}

        <div className="chart">test</div>

        <div className="p-4 mb-2 cursor-pointer text-center">
          <div >
          {otherCategories.length ? 
          <h1 onClick={()=>handleThreeDotsClick()}>...</h1>
          :
          <h1 onClick={()=>handlePlusClick()}>+</h1>}
          </div>
         
        </div>


      </div>






<CategoryOtherCategoryModal 
otherCategories={otherCategories} 
otherCategoriesModal={otherCategoriesModal} 
setOtherCategoriesModal={setOtherCategoriesModal} 
setCalculatorModal={handleCalculatorModalChange}
dispatch={dispatch}
handleGearClick={handleGearClick}
/>

<CategoryCalculatorModal categoryId={calculatorModal.categoryId} calculatorModal={calculatorModal.active} setCalculatorModal={setCalculatorModal}/>




    

 



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


      


    </>
  );
});

export default Categories