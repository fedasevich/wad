import { observer } from 'mobx-react-lite';
import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Context } from '../../index';

import { endOfMonth, startOfMonth } from 'date-fns';
import { runInAction } from 'mobx';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { fetchCategory } from '../../http/categoryApi';
import { CategoryDispatchContext } from '../../pages/Category';
import PageProvider from '../../pages/PageProvider';
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { SettingsBackgroundIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import DatePickerProvider from '../date-picker/DatePickerProvider';
import CategoriesChart from './CategoriesChart';
import "./CategoryStyle.css";

const CategoryCalculatorModal = lazy(() => import('./CategoryCalculatorModal'));
const CategoryOtherCategoryModal = lazy(() => import('./CategoryOtherCategoryModal'));

const MAIN_CATEGORIES_LENGTH = 7

const Categories = observer(() => {
  const { category } = useContext(Context)
  const [calculatorModal, setCalculatorModal] = useState({
    active: false,
    categoryId: null,
  })
  const [loading, setLoading] = useState(true)

  const [otherCategoriesModal, setOtherCategoriesModal] = useState(false)

  const dispatch = useContext(CategoryDispatchContext)

  const [dateRange, setDateRange] = useState([
    {
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
      key: 'selection',
      action: 'month'
    }
  ]);

  useEffect(() => {
    try {
      fetchCategory()
        .then((categoryData) => {
          runInAction(() => {
            category.setCategories(categoryData);
          });
        })
        // this is required to run then sequentially 
        .then(async () => {
          await category.fetchCategoryPeriod(dateRange).then(data => category.parseCategories(data)).finally(() => setLoading(false))
        })
    } catch (e) {
      alert(e.response.data.message);
    }
  }, [category, dateRange])

  if (loading) {
    return (<h2>loading</h2>)
  }


  const [firstCategories, otherCategories] = [category.parsedCategories.slice(0, MAIN_CATEGORIES_LENGTH),
  category.parsedCategories.slice(MAIN_CATEGORIES_LENGTH, category.parsedCategories.length)];
  const handlePlusClick = () => {
    dispatch({ operation: "CREATE_CATEGORY" });
  }

  const handleGearClick = (event, id) => {
    event.stopPropagation()
    dispatch({ operation: "EDIT_CATEGORY", id });
  }

  const handleThreeDotsClick = () => {
    setOtherCategoriesModal(true)
  }

  const handleCalculatorModalChange = ({ categoryId, active }) => {
    setCalculatorModal(prev => ({
      ...prev,
      categoryId,
      active,
    }));
  }

  return (
    <>
      <PageProvider.Header pageName={'Categories'} >
        <Col xs={{ span: 5, offset: 2 }} className="d-flex align-items-center justify-content-center">
          <DatePickerProvider dateRange={dateRange} setDateRange={setDateRange} />
        </Col>
      </PageProvider.Header>
      <Col md={12} className='categories'>
        {firstCategories.map((categoryMap) =>
        (
          <div className="category d-flex justify-content-center"

            key={categoryMap.id}>
            <div className="mb-2 d-flex flex-column align-items-center cursor-pointer position-relative w-fit-content h-fit-content" onClick={() => {
              setCalculatorModal({ active: true, categoryId: categoryMap.id })
            }}>
              <h4 className="mb-3 fw-medium">{categoryMap.name}</h4>
              <div className=" position-relative categoryIcon">
                <Icons iconId={categoryMap.iconId}></Icons>
                <span className="position-absolute top-0 start-100 translate-middle p-2 gear" onClick={(event) => {
                  handleGearClick(event, categoryMap.id)
                }}>
                  <SettingsBackgroundIcon />
                </span>
              </div>
              <h4 className="mt-3 fw-bold">{categoryMap.spent}</h4>
            </div>
          </div>
        )
        )}

        <div className="chart ">
          <CategoriesChart />
        </div>
        <div className="p-4 mb-2 d-flex text-center justify-content-center">
          <div className="d-flex justify-content-center cursor-pointer align-items-center h-100 w-fit-content h-fit-content">
            {otherCategories.length
              ? <h1 onClick={() => handleThreeDotsClick()}>...</h1>
              : <h1 onClick={() => handlePlusClick()}>+</h1>}
          </div>
        </div>
      </Col>
      <Suspense fallback={<h2>Loading</h2>}>
        {otherCategoriesModal &&
          <CategoryOtherCategoryModal
            otherCategories={otherCategories}
            otherCategoriesModal={otherCategoriesModal}
            setOtherCategoriesModal={setOtherCategoriesModal}
            setCalculatorModal={handleCalculatorModalChange}
            dispatch={dispatch}
            handleGearClick={handleGearClick}
          />
        }
      </Suspense>

      <Suspense >
        {calculatorModal.active &&
          <CategoryCalculatorModal
            categoryId={calculatorModal.categoryId}
            calculatorModal={calculatorModal.active}
            setCalculatorModal={setCalculatorModal}
          />
        }
      </Suspense>
    </>
  );
});

export default Categories
