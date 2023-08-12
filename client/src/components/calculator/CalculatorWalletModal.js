import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useStore } from '../../store'
import { WalletIcon } from '../../ui/Icons/ControlIcons/ControlIcons'
import MenuProvider from '../MenuProvider'
import Modal from '../modal/modal'

const CalculatorWalletModal = observer(({ walletModalActive, setWalletModalActive, setSelectedWallet }) => {
  const { wallet } = useStore()
  return (

    <Modal active={walletModalActive} setActive={setWalletModalActive} >

      <MenuProvider.Header>
        <h2>Choose wallet</h2>

      </MenuProvider.Header>
      <MenuProvider.Container>
        <Row>
          <Col md={12} className="overflow-auto vh-50 ">

            {wallet.wallets.map(walletsMap =>

              <div className="p-3 mb-2 modal_item"

                onClick={() => {
                  setSelectedWallet(walletsMap)
                  setWalletModalActive(false)
                }}
                key={walletsMap.id}>
                <WalletIcon />
                <h3 className='mt-1'>{walletsMap.name}</h3>
                <h6>{walletsMap.balance} {walletsMap.currency}</h6>
              </div>

            )}
          </Col>
        </Row>
      </MenuProvider.Container>



    </Modal>
  )
})

export default CalculatorWalletModal