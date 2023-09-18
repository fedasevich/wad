import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { SettingsBackgroundIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import MenuProvider from '../MenuProvider';
import Modal from '../modal/modal';

const CategoryOtherCategoryModal = observer(function CategoryOtherCategoryModal({
  otherCategories,
  otherCategoriesModal,
  setOtherCategoriesModal,
  setCalculatorModal,
  dispatch,
  handleGearClick
}) {
  const handleCategoryClick = (categoryMap) => {
    setCalculatorModal({ active: true, categoryId: categoryMap.id });
    setOtherCategoriesModal(false);
  };

  const handleGearIconClick = (event, categoryId) => {
    handleGearClick(event, categoryId);
  };

  const handleAddCategoryClick = () => {
    dispatch({ operation: 'CREATE_CATEGORY', dispatch });
  };

  return (
    <Modal active={otherCategoriesModal} setActive={setOtherCategoriesModal}>
      <MenuProvider.Header>
        <h2>Choose category</h2>
      </MenuProvider.Header>
      <MenuProvider.Container>
        <Row>
          <Col md={12} className="overflow-auto vh-50">
            {otherCategories.map((categoryMap) => (
              <button
                type="button"
                className="w-100 p-3 mb-2 modal_item d-flex flex-row justify-content-between category align-items-center categoryIconContainer"
                onClick={() => handleCategoryClick(categoryMap)}
                key={categoryMap.id}
              >
                <div className="position-relative categoryIconContainer">
                  <Icons iconId={categoryMap.iconId} />
                  <span
                    role="button"
                    onKeyDown={() => undefined}
                    tabIndex={0}
                    className="position-absolute top-0 start-100 translate-middle p-2 gear"
                    onClick={(event) => handleGearIconClick(event, categoryMap.id)}
                  >
                    <SettingsBackgroundIcon />
                  </span>
                </div>
                <h3 className="mt-1">{categoryMap.name}</h3>
                <h6>{categoryMap.spent}</h6>
              </button>
            ))}
            <button
              type="button"
              className="w-100 p-3 mb-2 modal_item bg-main-blue component-border-radius d-flex flex-row justify-content-center"
              onClick={handleAddCategoryClick}
            >
              <h3>+</h3>
            </button>
          </Col>
        </Row>
      </MenuProvider.Container>
    </Modal>
  );
});

export default CategoryOtherCategoryModal;
