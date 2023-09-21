import React, { useContext, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { DispatchContext } from '../../pages/MainPage';
import { useStore } from '../../store';
import { WALLET_PAGE_STATE } from '../../utils/constants';
import Currencies from '../Currencies';
import MenuProvider from '../MenuProvider';

function CreateWallet() {
  const [newWallet, setNewWallet] = useState({
    name: '',
    currency: '',
    balance: ''
  });
  const { wallet } = useStore();
  const dispatch = useContext(DispatchContext);

  const handleClose = () => {
    dispatch({ operation: WALLET_PAGE_STATE.DEFAULT_WALLET, id: -1 });
  };

  const handleCommit = () => {
    wallet.createWallet(newWallet.currency, newWallet.name);
    setNewWallet({
      name: '',
      currency: ''
    });
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
    setNewWallet({
      ...newWallet,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <Col xl={{ span: 4, offset: 1 }}>
        <MenuProvider>
          <MenuProvider.Actions close={handleClose} commit={handleCommit}>
            <h4>Create wallet</h4>
          </MenuProvider.Actions>
          <MenuProvider.Container>
            <Form.Label className="mb-2" htmlFor="name">
              Enter name:
            </Form.Label>
            <Form.Control
              className="mb-2 component-half-border-radius"
              id="name"
              type="text"
              name="name"
              onKeyDown={handleKeyDown}
              value={newWallet.name}
              onChange={handleChange}
            />
            <h5 className="mb-2">Chosen currency: {newWallet.currency}</h5>
          </MenuProvider.Container>
        </MenuProvider>
      </Col>

      <Col xl={{ span: 5, offset: 1 }}>
        <MenuProvider>
          <MenuProvider.Header>
            <h2>Choose currency:</h2>
          </MenuProvider.Header>
          <MenuProvider.Container>
            <Currencies setCurrency={handleChange} />
          </MenuProvider.Container>
        </MenuProvider>
      </Col>
    </>
  );
}

export default CreateWallet;
