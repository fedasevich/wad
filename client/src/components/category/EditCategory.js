import { observer } from 'mobx-react-lite';
import React, { Suspense, lazy, useContext, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { CategoryDispatchContext } from '../../pages/Category';
import { useStore } from '../../store';
import { AllCategoryIcons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { DeleteIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import { MAX_CATEGORY_NAME_LENGTH } from '../../utils/constants';
import MenuProvider from '../MenuProvider';

const DeleteConfirmModal = lazy(() => import('../modal/delete-confirm-modal/DeleteConfirmModal'));

const EditCategory = observer(({ id }) => {
  const [editCategory, setEditCategory] = useState({ name: '', icon: {} });
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const { category } = useStore();
  const dispatch = useContext(CategoryDispatchContext);

  const selectedCategoryToEdit = category.getCategoryById(id);

  const handleClose = () => {
    dispatch({ operation: null });
  };

  const handleCommit = async () => {
    if (editCategory.name.length > MAX_CATEGORY_NAME_LENGTH) {
      return toast.error(`Category name can't be longer than ${MAX_CATEGORY_NAME_LENGTH} symbols`);
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

  const handleDeleteCategory = async () => {
    await category.deleteCategory(id).finally(() => {
      handleClose();
    });
  };

  const handleCategoryNameChange = (e) => handleEditCategoryNameChange(e.target.value);

  const handleModalOpen = () => {
    setDeleteCategoryModal(true);
  };

  return (
    <>
      <Col xl={{ span: 5, offset: 1 }}>
        <MenuProvider>
          <MenuProvider.Actions close={handleClose} commit={handleCommit}>
            <h4>Edit category</h4>
            <h6>Category: {selectedCategoryToEdit.name}</h6>
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
              <h4 className="me-2 chosen-icon">Chosen icon: </h4>
              {editCategory.icon.svg && (
                <div
                  style={{
                    backgroundColor: editCategory.icon.backgroundColor
                  }}
                  className="bg-main-blue component-one-third-border-radius categoryIcon"
                >
                  {editCategory.icon?.svg}
                </div>
              )}
            </div>
            <button type="button" onClick={handleModalOpen}>
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
            <AllCategoryIcons selectedIcon={editCategory.icon} setSelectedIcon={handleEditCategoryIconChange} />
          </MenuProvider.Container>
        </MenuProvider>
      </Col>
      <Suspense>
        {deleteCategoryModal && (
          <DeleteConfirmModal
            deleteConfirmModal={deleteCategoryModal}
            setDeleteConfirmModal={setDeleteCategoryModal}
            nameToCheck={selectedCategoryToEdit.name}
            onDelete={handleDeleteCategory}
          />
        )}
      </Suspense>
    </>
  );
});

export default EditCategory;
