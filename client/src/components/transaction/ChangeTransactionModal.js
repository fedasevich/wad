import { getHours, getMinutes } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useStore } from '../../store';
import MenuProvider from '../MenuProvider';
import Modal from '../modal/modal';

const ChangeTransactionModal = observer(({ changeTransactionModal, setChangeTransactionModal, id }) => {
  const [newSum, setNewSum] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const { category } = useStore();

  const handleClose = () => {
    setChangeTransactionModal({ active: false, id: -1 });
  };

  const handleCommit = () => {
    category.changeTransaction(id, newSum, newDescription);
    handleClose();
  };

  const selectedTransaction = category.getTransactionById(id);

  const handleDescriptionChange = (e) => setNewDescription(e.target.value);
  const handleSumChange = (e) => setNewSum(e.target.value);

  return (
    <Modal active={changeTransactionModal} setActive={setChangeTransactionModal}>
      <MenuProvider>
        <MenuProvider.Actions close={handleClose} commit={handleCommit}>
          <h4>Change transaction</h4>
          <h6>Description: {selectedTransaction?.description}</h6>
          <h6>Id: {selectedTransaction?.id}</h6>
          <h6>Sum: {selectedTransaction?.sum}</h6>
          <h6>
            Time: {getHours(new Date(selectedTransaction?.createdAt))}:
            {getMinutes(new Date(selectedTransaction?.createdAt))}
          </h6>
        </MenuProvider.Actions>
        <MenuProvider.Container>
          <div className="d-flex align-items-center flex-column ">
            <Form.Label className="mb-2" htmlFor="name">
              Enter new description:
            </Form.Label>
            <Form.Control
              className="mb-3 component-half-border-radius"
              type="text"
              name="description"
              id="description"
              value={newDescription}
              onChange={handleDescriptionChange}
            />
            <Form.Label className="mb-2" htmlFor="spent">
              Enter spent:
            </Form.Label>
            <Form.Control
              className="mb-3 component-half-border-radius"
              type="number"
              name="spent"
              id="spent"
              value={newSum}
              onChange={handleSumChange}
            />
          </div>
        </MenuProvider.Container>
      </MenuProvider>
    </Modal>
  );
});

export default ChangeTransactionModal;
