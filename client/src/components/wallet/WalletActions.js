import { observer } from 'mobx-react-lite'
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { BalanceIcon, EditIcon, RechargeIcon, TransactionsIcon, TransferIcon, WithdrawIcon } from '../../ui/Icons/WalletIcons/WalletIcons'

const WalletActionsAndIcons = [
  { icon: <EditIcon />, action: "EDIT_WALLET", name: "Edit" },
  { icon: <RechargeIcon />, action: "RECHARGE_WALLET", name: "Recharge" },
  { icon: <BalanceIcon />, action: "BALANCE_WALLET", name: "Balance" },
  { icon: <WithdrawIcon />, action: "WITHDRAW_WALLET", name: "Withdraw" },
  { icon: <TransactionsIcon />, action: "TRANSACTIONS_WALLET", name: "Transactions" },
  { icon: <TransferIcon />, action: "TRANSFER_WALLET", name: "Transfer" },
]



const WalletActions = observer(({ dispatch, id }) => {
  return (
    <>

      <Row>
        {WalletActionsAndIcons.map((WalletActionAndIcon, index) =>
          <Col sm="6" md="6" className='mb-3 px-lg-0 px-xl-2' key={index}>
            <div className='cursor-pointer' onClick={() => { dispatch({ operation: WalletActionAndIcon.action, id: id }) }}>
              {WalletActionAndIcon.icon}
              <span className='ms-2'>{WalletActionAndIcon.name}</span>
            </div>
          </Col>
        )}
      </Row>
    </>
  )
})

export default WalletActions