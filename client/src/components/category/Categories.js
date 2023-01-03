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
import { addDays } from 'date-fns';
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { runInAction } from 'mobx';
import { AllIcons, Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons'
import "./CategoryStyle.css"
import CategoryOtherCategoryModal from './CategoryOtherCategoryModal';
import CategoryCalculatorModal from './CategoryCalculatorModal';



const MAIN_CATEGORIES_LENGTH = 7

const Categories = observer(() => {
  const { category} = useContext(Context)
  const [calculatorModal, setCalculatorModal] = useState({
    active: false,
    categoryId:null,
  })
  const [createCategoryModal, setCreateCategoryModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [resetCategoriesModal, setResetCategoriesModal] = useState(false)
  const [datePickerModal, setDatePickerModal] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState([])
  const [otherCategoriesModal, setOtherCategoriesModal] = useState(false)
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);


  useEffect(() => {
    const date = new Date()

    try {
      fetchCategory().then(data => category.setCategories(data)).finally(() => setLoading(false))
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
  setCreateCategoryModal(true);
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

      <div className="category">


        {/* <Button onClick={()=> {
       setDatePickerModal(true)
      
       }}>test</Button> */}
        {firstCategories.map(categoryMap =>


          <div className="p-1 mb-2 d-flex flex-column align-items-center cursor-pointer"
            onClick={() => {
              setCalculatorModal({active:true,categoryId:categoryMap.id})
            }}
            key={categoryMap.id}>



            <h4 className='mb-3 fw-medium'>{categoryMap.name}</h4>
            <Icons iconId={categoryMap.iconId}></Icons>
            <h4 className='mt-3 fw-bold'>{categoryMap.spent}</h4>
          </div>


        )}

        <div className="chart">test</div>

        <div className="p-4 mb-2 cursor-pointer">
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
setCalculatorModal={handleCalculatorModalChange}/>

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


      {/* <Modal active={datePickerModal} setActive={setDatePickerModal}>
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
        {/* idk how to make it better 
        <Button onClick={() => {
          try {
            fetchCategoryPeriod(dateRange[0].startDate.toISOString(), dateRange[0].endDate.toISOString()).then(data => {
              if (!data) {
                return
              }
              runInAction(() => {
                category.categories.forEach(categoryMap => {
                  categoryMap.spent = 0;
                })
                data.rows.forEach(dataMap => {
                  category.categories.map(categoryMap => {

                    if (dataMap.categoryId === categoryMap.id) {
                      categoryMap.spent += parseFloat(dataMap.sum)
                    }
                  }
                  )
                })
              })
            }).then(() => setDatePickerModal(false))
          } catch (e) {
            alert(e.response.data.message);
          }
        }}>Submit</Button>
      </Modal> */}


    </>
  );
});

export default Categories