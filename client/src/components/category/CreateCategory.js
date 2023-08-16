import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { CategoryDispatchContext } from '../../pages/Category';
import { useStore } from '../../store';
import { AllIcons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
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
      return alert("name can't be empty");
    }
    if (!newCategorySelectedIcon.id) {
      return alert('please select icon');
    }
    await category.createCategory(newCategoryName, newCategorySelectedIcon).finally(() => {
      handleClose();
    });
  };

  const handleCategoryNameChange = (e) => setNewCategoryName(e.target.value);

  return (
    <>
      <Col xl={{ span: 5, offset: 1 }}>
        <MenuProvider>
          <MenuProvider.Actions close={handleClose} commit={handleCommit}>
            <h4>Create category</h4>
          </MenuProvider.Actions>
          <MenuProvider.Container>
            <Form.Label htmlFor="test">Enter name:</Form.Label>
            <Form.Control
              className="mb-3 component-half-border-radius"
              type="text"
              id="test"
              name="test"
              value={newCategoryName}
              onChange={handleCategoryNameChange}
            />
            <div className="d-flex align-items-center">
              <h4 className="me-2">Chosen icon: </h4>
              <div className="bg-main-blue component-one-third-border-radius">{newCategorySelectedIcon.svg}</div>
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
            <AllIcons selectedIcon={newCategorySelectedIcon} setSelectedIcon={setNewCategorySelectedIcon} />
          </MenuProvider.Container>
        </MenuProvider>
      </Col>
    </>
  );
});

export default CreateCategory;
