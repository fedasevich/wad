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
import { CategoryPlusIcon, CategoryThreeDotsIcon, Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { SettingsBackgroundIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import DatePickerProvider from '../date-picker/DatePickerProvider';
import Loader from '../loader/Loader';
import CategoriesChart from './CategoriesChart';
import './CategoryStyle.css';

const CategoryCalculatorModal = lazy(() => import('./CategoryCalculatorModal'));
const CategoryOtherCategoryModal = lazy(() => import('./CategoryOtherCategoryModal'));

const MAIN_CATEGORIES_LENGTH = 7;

const Categories = observer(() => {
  const { category, currency } = useStore();
  const [calculatorModal, setCalculatorModal] = useState({
    active: false,
    selectedCategory: null
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

  const filteredParsedCategories = category.parsedCategories.filter((category) => category.isIncome === false);

  const [firstCategories, otherCategories] = [
    filteredParsedCategories.slice(0, MAIN_CATEGORIES_LENGTH),
    filteredParsedCategories.slice(MAIN_CATEGORIES_LENGTH, filteredParsedCategories.length)
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

  const handleCalculatorModalChange = ({ selectedCategory, active }) => {
    setCalculatorModal((prev) => ({
      ...prev,
      selectedCategory,
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
                setCalculatorModal({ active: true, selectedCategory: categoryMap });
              }}
            >
              <h4 className="mb-3 categoryName">{categoryMap.name}</h4>
              <div className="position-relative categoryIconContainer">
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
              <h4 className="mt-3 fw-bold ">
                {categoryMap.spent.toFixed(2)} {currency.userCurrency.symbol}
              </h4>
            </button>
          </div>
        ))}

        <div className="chart ">
          <CategoriesChart />
        </div>
        <div className="p-4 mb-2 d-flex text-center justify-content-center">
          <div className="d-flex justify-content-center cursor-pointer align-items-center h-100 w-fit-content h-fit-content">
            {otherCategories.length ? (
              <button
                type="button"
                onClick={handleThreeDotsClick}
                className="bg-grey-dark categoryIcon component-one-third-border-radius"
              >
                <CategoryThreeDotsIcon />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePlusClick}
                className="bg-grey-dark categoryIcon component-one-third-border-radius"
                data-testid="category-create-icon"
              >
                <CategoryPlusIcon />
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
            selectedCategory={calculatorModal.selectedCategory}
            calculatorModal={calculatorModal.active}
            setCalculatorModal={setCalculatorModal}
          />
        )}
      </Suspense>
    </>
  );
});

export default Categories;
