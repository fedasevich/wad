import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../store';
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import MenuProvider from '../MenuProvider';
import Modal from '../modal/modal';

const CalculatorCategoryModal = observer(({ categoryModalActive, setCategoryModalActive, setSelectedCategory }) => {
  const { category } = useStore();
  const handleCategorySelect = (categoryMap) => {
    setSelectedCategory(categoryMap);
    setCategoryModalActive(false);
  };

  return (
    <Modal active={categoryModalActive} setActive={setCategoryModalActive} id="category">
      <MenuProvider.Header>
        <h2>Choose category</h2>
      </MenuProvider.Header>
      <MenuProvider.Container>
        <div className="overflow-auto vh-50 ">
          {category.categories.map((categoryMap) => (
            <button
              type="button"
              className="d-flex align-items-center justify-content-start w-100 text-start p-3 mb-2 modal_item"
              onClick={() => handleCategorySelect(categoryMap)}
              key={categoryMap.id}
            >
              <Icons iconId={categoryMap.iconId} />
              <h3 className="ms-3">{categoryMap.name}</h3>
            </button>
          ))}
        </div>
      </MenuProvider.Container>
    </Modal>
  );
});

export default CalculatorCategoryModal;
