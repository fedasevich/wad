import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../store';
import { WalletIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import MenuProvider from '../MenuProvider';
import Modal from '../modal/modal';

const CalculatorWalletModal = observer(({ walletModalActive, setWalletModalActive, setSelectedWallet }) => {
  const { wallet, currency } = useStore();

  const handleWalletSelect = (walletsMap) => {
    setSelectedWallet(walletsMap);
    setWalletModalActive(false);
  };

  return (
    <Modal active={walletModalActive} setActive={setWalletModalActive} id="wallet">
      <MenuProvider.Header>
        <h2>Choose wallet</h2>
      </MenuProvider.Header>
      <MenuProvider.Container>
        <div className="overflow-auto vh-50 ">
          {wallet.wallets.map((walletsMap) => (
            <button
              type="button"
              className="w-100 p-3 mb-2 text-start modal_item"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWalletSelect(walletsMap);
              }}
              key={walletsMap.id}
            >
              <WalletIcon />
              <h4 className="mt-1">{walletsMap.name}</h4>
              <h6>
                {walletsMap.balance.toFixed(2)} {currency.userCurrency.symbol}
              </h6>
            </button>
          ))}
        </div>
      </MenuProvider.Container>
    </Modal>
  );
});

export default CalculatorWalletModal;
