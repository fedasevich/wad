import React, { useContext, useEffect, useRef, useState } from 'react';

import { Form } from 'react-bootstrap';
import { DispatchContext } from '../../pages/MainPage';
import { useStore } from '../../store';
import { DeleteIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import Currencies from '../Currencies';
import MenuProvider from '../MenuProvider';

function EditWallet({ id }) {
  const { wallet } = useStore();
  const dispatch = useContext(DispatchContext);
  const [editWallet, setEditWallet] = useState({
    name: '',
    currency: '',
    balance: ''
  });
  const scrollRef = useRef(null);

  const eraseState = () => {
    setEditWallet({
      name: '',
      currency: '',
      balance: ''
    });
  };

  const handleClose = () => {
    dispatch({ operation: 'DEFAULT_WALLET', id: -1 });
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
    wallet.editWallet(id, editWallet.currency, editWallet.name, editWallet.balance);
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

  const handleDoubleClick = (id) => {
    wallet.deleteWallet(id);
    eraseState();
    handleClose();
  };

  return (
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
          type="number"
          name="balance"
          onKeyDown={handleKeyDown}
          value={editWallet.balance}
          onChange={handleChange}
        />
        <h4 className="mb-2">Choose new currency:</h4>
        <Currencies setCurrency={handleChange} walletDefaultCurrency={wallet.getWalletById(id).currency} />
        <button onDoubleClick={() => handleDoubleClick(id)} type="button">
          <h6 className="text-danger mb-0 btn">
            <DeleteIcon /> Delete wallet
          </h6>
        </button>
      </MenuProvider.Container>
    </MenuProvider>
  );
}

export default EditWallet;
