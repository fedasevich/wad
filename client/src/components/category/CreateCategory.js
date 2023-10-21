import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { CategoryDispatchContext } from '../../pages/Category';
import { useStore } from '../../store';
import { AllCategoryIcons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { MAX_CATEGORY_NAME_LENGTH } from '../../utils/constants';
import MenuProvider from '../MenuProvider';

const CreateCategory = observer(() => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySelectedIcon, setNewCategorySelectedIcon] = useState({});
  const { category } = useStore();
  const dispatch = useContext(CategoryDispatchContext);

  const handleClose = () => {
    dispatch({ operation: null });
  };

  const handleCommit = async () => {
    if (!newCategoryName) {
      return toast.error('Category name cannot be empty.');
    }

    if (newCategoryName.length > MAX_CATEGORY_NAME_LENGTH) {
      return toast.error(`Category name should not exceed ${MAX_CATEGORY_NAME_LENGTH} characters.`);
    }

    if (!newCategorySelectedIcon.id) {
      return toast.error('Please select an icon for the category.');
    }

    await category.createCategory(newCategoryName, newCategorySelectedIcon).finally(() => {
      handleClose();
    });
  };

  const handleCategoryNameChange = (e) => setNewCategoryName(e.target.value);

  return (
    <>
      <Col xl={{ span: 4, offset: 1 }}>
        <MenuProvider>
          <MenuProvider.Actions onClose={handleClose} onCommit={handleCommit}>
            <h4>Create category</h4>
          </MenuProvider.Actions>
          <MenuProvider.Container>
            <Form.Label htmlFor="categoryName">Enter name:</Form.Label>
            <Form.Control
              className="mb-3 component-half-border-radius"
              type="text"
              id="categoryName"
              name="categoryName"
              value={newCategoryName}
              onChange={handleCategoryNameChange}
            />
            <div className="d-flex align-items-center">
              <h4 className="me-2 chosen-icon">Chosen icon: </h4>
              {newCategorySelectedIcon?.svg && (
                <div
                  style={{
                    backgroundColor: newCategorySelectedIcon.backgroundColor
                  }}
                  className="bg-main-blue component-one-third-border-radius categoryIcon"
                >
                  {newCategorySelectedIcon.svg}
                </div>
              )}
            </div>
          </MenuProvider.Container>
        </MenuProvider>
      </Col>
      <Col xl={{ span: 5, offset: 1 }}>
        <MenuProvider>
          <MenuProvider.Header>
            <h2>Select icon</h2>
          </MenuProvider.Header>
          <MenuProvider.Container>
            <AllCategoryIcons selectedIcon={newCategorySelectedIcon} setSelectedIcon={setNewCategorySelectedIcon} />
          </MenuProvider.Container>
        </MenuProvider>
      </Col>
    </>
  );
});

export default CreateCategory;
