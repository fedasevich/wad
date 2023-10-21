import { Button, Col, Row } from 'react-bootstrap';
import MenuProvider from '../../MenuProvider';
import Modal from '../../modal/modal';

function UserCurrencyConvertConfirmModal({ convertConfirmModal, setConfirmConfirmModal, onConfirm }) {
  const handleModalClose = () => {
    setConfirmConfirmModal(false);
  };

  const handleConfirmConfirmClick = () => onConfirm();

  return (
    <Modal active={convertConfirmModal} setActive={setConfirmConfirmModal} id="wallet">
      <MenuProvider.Header.Rounded>
        <h4>Do you want to save your changes?</h4>
      </MenuProvider.Header.Rounded>
      <MenuProvider.Container>
        <Row>
          <Col md={12}>
            <h5>These changes are irreversible.</h5>
            <div className="d-flex mt-4">
              <Button variant="success" className="w-100 me-3" onClick={handleConfirmConfirmClick}>
                Save changes
              </Button>
              <Button variant="secondary" className="w-100" onClick={handleModalClose}>
                Don&apos;t save
              </Button>
            </div>
          </Col>
        </Row>
      </MenuProvider.Container>
    </Modal>
  );
}

export default UserCurrencyConvertConfirmModal;
