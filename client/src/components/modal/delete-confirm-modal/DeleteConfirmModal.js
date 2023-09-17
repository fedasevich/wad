import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import MenuProvider from '../../MenuProvider';
import Modal from '../modal';

function DeleteConfirmModal({ deleteConfirmModal, setDeleteConfirmModal, nameToCheck, onDelete }) {
  const [nameConfirm, setNameConfirm] = useState('');

  const handleModalClose = () => {
    setDeleteConfirmModal(false);
  };

  const handleNameConfirmChange = (event) => {
    setNameConfirm(event.target.value);
  };

  const isButtonDisabled = nameConfirm !== nameToCheck;

  const handleDeleteConfirmClick = () => onDelete();

  return (
    <Modal active={deleteConfirmModal} setActive={setDeleteConfirmModal} id="wallet">
      <MenuProvider.Actions close={handleModalClose}>
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
              value={nameConfirm}
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
