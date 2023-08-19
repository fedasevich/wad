import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { CategoryDispatchContext } from '../../pages/Category';
import { useStore } from '../../store';
import { AllIcons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { DeleteIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import { MAX_CATEGORY_NAME_LENGTH } from '../../utils/constants';
import MenuProvider from '../MenuProvider';

const EditCategory = observer(({ id }) => {
  const [editCategory, setEditCategory] = useState({ name: '', icon: {} });

  const { category } = useStore();
  const dispatch = useContext(CategoryDispatchContext);

  const handleClose = () => {
    dispatch({ operation: null });
  };

  const handleCommit = async () => {
    if (editCategory.name.length > MAX_CATEGORY_NAME_LENGTH) {
      return alert(`Category name can't be longer than ${MAX_CATEGORY_NAME_LENGTH} symbols`);
    }
    await category.changeCategory(id, editCategory).finally(() => {
      handleClose();
    });
  };

  const handleEditCategoryNameChange = (value) => {
    setEditCategory({ ...editCategory, name: value });
  };

  const handleEditCategoryIconChange = (value) => {
    setEditCategory({ ...editCategory, icon: value });
  };

  const handleDoubleClickToDeleteCategory = async () => {
    await category.deleteCategory(id).finally(() => {
      handleClose();
    });
  };

  const handleCategoryNameChange = (e) => handleEditCategoryNameChange(e.target.value);

  return (
    <>
      <Col xl={{ span: 5, offset: 1 }}>
        <MenuProvider>
          <MenuProvider.Actions close={handleClose} commit={handleCommit}>
            <h4>Edit category</h4>
            <h6>Category: {category.getCategoryById(id).name}</h6>
          </MenuProvider.Actions>
          <MenuProvider.Container>
            <Form.Label className="mb-2" htmlFor="name">
              Enter name:
            </Form.Label>
            <Form.Control
              className="mb-3 component-half-border-radius"
              type="text"
              name="name"
              value={editCategory.name}
              onChange={handleCategoryNameChange}
            />
            <div className="d-flex align-items-center">
              <h4 className="me-2">Chosen icon: </h4>
              <div className="bg-main-blue component-one-third-border-radius">{editCategory.icon?.svg}</div>
            </div>
            <button type="button" onDoubleClick={handleDoubleClickToDeleteCategory}>
              <h6 className="text-danger mb-0 mt-3 btn">
                <DeleteIcon /> Delete category
              </h6>
            </button>
          </MenuProvider.Container>
        </MenuProvider>
      </Col>

      <Col xl={{ span: 5, offset: 1 }}>
        <MenuProvider>
          <MenuProvider.Header>
            <h2>Select icon</h2>
          </MenuProvider.Header>
          <MenuProvider.Container>
            <AllIcons selectedIcon={editCategory.icon} setSelectedIcon={handleEditCategoryIconChange} />
          </MenuProvider.Container>
        </MenuProvider>
      </Col>
    </>
  );
});

export default EditCategory;
