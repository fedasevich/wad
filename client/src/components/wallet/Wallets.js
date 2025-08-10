import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Accordion, Card, Col, Row, useAccordionButton } from 'react-bootstrap';
import { DispatchContext } from '../../pages/MainPage';
import { useStore } from '../../store';
import { WALLET_PAGE_STATE } from '../../utils/constants';
import WalletActions from './WalletActions';
import { WalletItem } from './WalletItem';

function WalletToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div role="button" onKeyDown={decoratedOnClick} tabIndex={0} onClick={decoratedOnClick}>
      {children}
    </div>
  );
}

const Wallets = observer(() => {
  const { wallet } = useStore();
  const dispatch = useContext(DispatchContext);

  const handleAddWalletClick = () => {
    dispatch({ operation: WALLET_PAGE_STATE.CREATE_WALLET, id: -1 });
  };

  return (
    <Row className="fw-medium">
      <Accordion>
        {wallet.wallets.map((walletsMap, index) => (
          <Col md="12" className="mb-4 wallet" key={walletsMap.id}>
            <Card className="component-shadow">
              <WalletToggle eventKey={index}>
                <Card.Header className="w-100 d-flex flex-row justify-content-between align-items-center">
                  <WalletItem wallet={walletsMap} />
                </Card.Header>
              </WalletToggle>
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
          className="w-100 p-3 mb-2 border-0 component-shadow bg-light-blue text-center component-border-radius cursor-pointer text-white"
          onClick={handleAddWalletClick}
        >
          <span className="fw-medium">Add wallet</span>
        </button>
      </Col>
    </Row>
  );
});

export default Wallets;
