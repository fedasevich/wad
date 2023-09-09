import { observer } from 'mobx-react-lite';
import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';

import { endOfMonth, startOfMonth } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { toast } from 'react-hot-toast';
import { CategoryDispatchContext } from '../../pages/Category';
import PageProvider from '../../pages/PageProvider';
import { useStore } from '../../store';
import CategoryStore from '../../store/CategoryStore';
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { SettingsBackgroundIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import DatePickerProvider from '../date-picker/DatePickerProvider';
import Loader from '../loader/Loader';
import CategoriesChart from './CategoriesChart';
import './CategoryStyle.css';

const CategoryCalculatorModal = lazy(() => import('./CategoryCalculatorModal'));
const CategoryOtherCategoryModal = lazy(() => import('./CategoryOtherCategoryModal'));

const MAIN_CATEGORIES_LENGTH = 7;

const Categories = observer(() => {
  const { category } = useStore();
  const [calculatorModal, setCalculatorModal] = useState({
    active: false,
    categoryId: null
  });
  const [loading, setLoading] = useState(true);

  const [otherCategoriesModal, setOtherCategoriesModal] = useState(false);

  const dispatch = useContext(CategoryDispatchContext);

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
      CategoryStore.fetchCategoryPeriod(dateRange)
        .then((data) => category.parseCategories(data))
        .finally(() => setLoading(false));
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }, [category, dateRange]);

  if (loading) {
    return <Loader isFullHeight />;
  }

  const [firstCategories, otherCategories] = [
    category.parsedCategories.slice(0, MAIN_CATEGORIES_LENGTH),
    category.parsedCategories.slice(MAIN_CATEGORIES_LENGTH, category.parsedCategories.length)
  ];

  const handlePlusClick = () => {
    dispatch({ operation: 'CREATE_CATEGORY' });
  };

  const handleGearClick = (event, id) => {
    event.stopPropagation();
    dispatch({ operation: 'EDIT_CATEGORY', id });
  };

  const handleThreeDotsClick = () => {
    setOtherCategoriesModal(true);
  };

  const handleCalculatorModalChange = ({ categoryId, active }) => {
    setCalculatorModal((prev) => ({
      ...prev,
      categoryId,
      active
    }));
  };

  return (
    <>
      <PageProvider.Header pageName="Categories">
        <Col xs={{ span: 5, offset: 2 }} className="d-flex align-items-center justify-content-center">
          <DatePickerProvider dateRange={dateRange} setDateRange={setDateRange} />
        </Col>
      </PageProvider.Header>
      <Col md={12} className="categories">
        {firstCategories.map((categoryMap) => (
          <div className="category d-flex justify-content-center" key={categoryMap.id}>
            <button
              type="button"
              className="mb-2 px-0 d-flex mw-100 flex-column align-items-center cursor-pointer position-relative w-fit-content h-fit-content"
              onClick={() => {
                setCalculatorModal({ active: true, categoryId: categoryMap.id });
              }}
            >
              <h4 className="mb-3 categoryName">{categoryMap.name}</h4>
              <div className="position-relative categoryIcon">
                <Icons iconId={categoryMap.iconId} />
                <span
                  role="button"
                  data-testid={`category-settings-${categoryMap.id}`}
                  onKeyDown={() => undefined}
                  tabIndex={0}
                  className="position-absolute top-0 start-100 translate-middle p-2 gear"
                  onClick={(event) => {
                    handleGearClick(event, categoryMap.id);
                  }}
                >
                  <SettingsBackgroundIcon />
                </span>
              </div>
              <h4 className="mt-3 fw-bold ">{categoryMap.spent}</h4>
            </button>
          </div>
        ))}

        <div className="chart ">
          <CategoriesChart />
        </div>
        <div className="p-4 mb-2 d-flex text-center justify-content-center">
          <div className="d-flex justify-content-center cursor-pointer align-items-center h-100 w-fit-content h-fit-content">
            {otherCategories.length ? (
              <button type="button" onClick={handleThreeDotsClick}>
                <h1>...</h1>
              </button>
            ) : (
              <button type="button" onClick={handlePlusClick} data-testid="category-create-icon">
                <h1>+</h1>
              </button>
            )}
          </div>
        </div>
      </Col>
      <Suspense>
        {otherCategoriesModal && (
          <CategoryOtherCategoryModal
            otherCategories={otherCategories}
            otherCategoriesModal={otherCategoriesModal}
            setOtherCategoriesModal={setOtherCategoriesModal}
            setCalculatorModal={handleCalculatorModalChange}
            dispatch={dispatch}
            handleGearClick={handleGearClick}
          />
        )}
      </Suspense>

      <Suspense>
        {calculatorModal.active && (
          <CategoryCalculatorModal
            categoryId={calculatorModal.categoryId}
            calculatorModal={calculatorModal.active}
            setCalculatorModal={setCalculatorModal}
          />
        )}
      </Suspense>
    </>
  );
});

export default Categories;
