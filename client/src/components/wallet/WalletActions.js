import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { EditIcon, TransactionsIcon, TransferIcon, WithdrawIcon } from '../../ui/Icons/WalletIcons/WalletIcons';
import { WALLET_PAGE_STATE } from '../../utils/constants';

export const WALLET_ACTIONS_AND_ICONS = [
  { id: 1, icon: <EditIcon />, action: WALLET_PAGE_STATE.EDIT_WALLET, name: 'Edit' },
  { id: 2, icon: <WithdrawIcon />, action: WALLET_PAGE_STATE.WITHDRAW_WALLET, name: 'Withdraw' },
  { id: 3, icon: <TransactionsIcon />, action: WALLET_PAGE_STATE.TRANSACTIONS_WALLET, name: 'Transactions' },
  { id: 4, icon: <TransferIcon />, action: WALLET_PAGE_STATE.TRANSFER_WALLET, name: 'Transfer' }
];

const WalletActions = observer(({ dispatch, id }) => {
  return (
    <Row>
      {WALLET_ACTIONS_AND_ICONS.map((walletActionAndIcon) => (
        <Col
          sm="6"
          md="6"
          className="mb-3 px-xl-2 d-flex justify-content-xl-center justify-content-xxl-start"
          key={walletActionAndIcon.id}
        >
          <button
            type="button"
            className="cursor-pointer d-flex align-items-center flex-lg-row flex-xl-column flex-xxl-row justify-content-center text-center"
            onClick={() => {
              dispatch({ operation: walletActionAndIcon.action, id });
            }}
          >
            {walletActionAndIcon.icon}
            <span className="ms-2 ms-md-2 ms-xl-0 ms-xxl-2">{walletActionAndIcon.name}</span>
          </button>
        </Col>
      ))}
    </Row>
  );
});

export default WalletActions;
