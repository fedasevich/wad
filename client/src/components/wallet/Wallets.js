import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Accordion, Card, Col, Row, useAccordionButton } from 'react-bootstrap';
import { fetchWallet } from '../../http/walletApi';
import { DispatchContext } from '../../pages/MainPage';
import { useStore } from '../../store';
import WalletActions from './WalletActions';
import { WalletItem } from './WalletItem';

function WalletToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center"
      role="button"
      onKeyDown={decoratedOnClick}
      tabIndex={0}
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

const Wallets = observer(() => {
  const { wallet } = useStore();
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    try {
      fetchWallet().then((data) => {
        runInAction(() => {
          wallet.setWallet(data);
        });
      });
    } catch (e) {
      alert(e.response.data.message);
    }
  }, []);

  const handleAddWalletClick = () => {
    dispatch({ operation: 'CREATE_WALLET', id: -1 });
  };

  return (
    <Row className="fw-medium">
      <Accordion>
        {wallet.wallets.map((walletsMap, index) => (
          <Col md="12" className="mb-4 wallet" key={walletsMap.id}>
            <Card className="component-shadow">
              <Card.Header>
                <WalletToggle eventKey={index}>
                  <WalletItem wallet={walletsMap} />
                </WalletToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={index}>
                <Card.Body>
                  <WalletActions dispatch={dispatch} id={walletsMap.id} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Col>
        ))}
      </Accordion>

      <Col md="12">
        <button
          type="button"
          className="w-100 p-4 mb-2 component-shadow bg-light-blue text-center component-border-radius cursor-pointer text-white"
          onClick={handleAddWalletClick}
        >
          <span>Add wallet</span>
        </button>
      </Col>
    </Row>
  );
});

export default Wallets;
