import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import MenuProvider from '../../MenuProvider';
import Modal from '../modal';

function DeleteConfirmModal({ deleteConfirmModal, setDeleteConfirmModal, nameToCheck, onDelete }) {
  const [nameToConfirm, setNameToConfirm] = useState('');

  const handleModalClose = () => {
    setDeleteConfirmModal(false);
  };

  const handleNameConfirmChange = (event) => {
    setNameToConfirm(event.target.value);
  };

  const isButtonDisabled = nameToConfirm !== String(nameToCheck);

  const handleDeleteConfirmClick = () => onDelete();

  return (
    <Modal active={deleteConfirmModal} setActive={setDeleteConfirmModal} id="wallet">
      <MenuProvider.Actions onClose={handleModalClose}>
        <h4>Delete &quot;{nameToCheck}&quot;</h4>
      </MenuProvider.Actions>
      <MenuProvider.Container>
        <Row>
          <Col md={12} className="overflow-auto">
            <Form.Label className="mb-2" htmlFor="nameConfirm">
              To confirm, type &quot;{nameToCheck}&quot; in the box below
            </Form.Label>
            <Form.Control
              className="mb-2 component-half-border-radius border-danger"
              type="text"
              id="nameConfirm"
              name="nameConfirm"
              value={nameToConfirm}
              onChange={handleNameConfirmChange}
            />
            <Button variant="danger" disabled={isButtonDisabled} className="w-100" onClick={handleDeleteConfirmClick}>
              Delete
            </Button>
          </Col>
        </Row>
      </MenuProvider.Container>
    </Modal>
  );
}

export default DeleteConfirmModal;
