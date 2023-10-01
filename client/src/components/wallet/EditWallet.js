import React, { Suspense, lazy, useContext, useEffect, useRef, useState } from 'react';

import { Form } from 'react-bootstrap';
import { DispatchContext } from '../../pages/MainPage';
import { useStore } from '../../store';
import { DeleteIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import { WALLET_PAGE_STATE } from '../../utils/constants';
import MenuProvider from '../MenuProvider';

const DeleteConfirmModal = lazy(() => import('../modal/delete-confirm-modal/DeleteConfirmModal'));

function EditWallet({ id }) {
  const { wallet } = useStore();
  const dispatch = useContext(DispatchContext);
  const [editWallet, setEditWallet] = useState({
    name: '',
    balance: ''
  });

  const [deleteWalletModal, setDeleteWalletModal] = useState(false);

  const scrollRef = useRef(null);

  const selectedWalletToEdit = wallet.getWalletById(id);

  const eraseState = () => {
    setEditWallet({
      name: '',
      balance: ''
    });
  };

  const handleClose = () => {
    dispatch({ operation: WALLET_PAGE_STATE.DEFAULT_WALLET, id: -1 });
  };

  useEffect(() => {
    eraseState();
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleCommit = () => {
    wallet.editWallet(id, editWallet.name, editWallet.balance);
    eraseState();
    handleClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCommit();
    }
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleChange = (event) => {
    setEditWallet({
      ...editWallet,
      [event.target.name]: event.target.value
    });
  };

  const handleModalOpen = () => {
    setDeleteWalletModal(true);
  };

  const handleDelete = () => {
    wallet.deleteWallet(id);
    eraseState();
    handleClose();
  };

  return (
    <>
      <MenuProvider>
        <MenuProvider.Actions close={handleClose} commit={handleCommit}>
          <h5 ref={scrollRef} className="scroll-margin">
            Edit wallet
          </h5>
          <h6>Wallet: {wallet.getWalletById(id).name}</h6>
        </MenuProvider.Actions>

        <MenuProvider.Container>
          <Form.Label className="mb-2" htmlFor="name">
            Enter new name:
          </Form.Label>
          <Form.Control
            className="mb-2 component-half-border-radius"
            type="text"
            id="name"
            name="name"
            onKeyDown={handleKeyDown}
            value={editWallet.name}
            onChange={handleChange}
          />
          <Form.Label className="mb-2" htmlFor="balance">
            Enter new balance:
          </Form.Label>
          <Form.Control
            className="mb-2 component-half-border-radius"
            inputMode="numeric"
            pattern="[0-9]*"
            type="number"
            id="balance"
            name="balance"
            onKeyDown={handleKeyDown}
            value={editWallet.balance}
            onChange={handleChange}
          />
          <button onClick={handleModalOpen} type="button">
            <h6 className="text-danger mb-0 btn">
              <DeleteIcon /> Delete wallet
            </h6>
          </button>
        </MenuProvider.Container>
      </MenuProvider>

      <Suspense>
        {deleteWalletModal && (
          <DeleteConfirmModal
            deleteConfirmModal={deleteWalletModal}
            setDeleteConfirmModal={setDeleteWalletModal}
            nameToCheck={selectedWalletToEdit.name}
            onDelete={handleDelete}
          />
        )}
      </Suspense>
    </>
  );
}

export default EditWallet;
