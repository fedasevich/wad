import { observer } from 'mobx-react-lite';
import React, { Suspense, lazy, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useStore } from '../../../store';
import { WalletIcon } from '../../../ui/Icons/ControlIcons/ControlIcons';
import { ConvertIcon } from '../../../ui/Icons/WalletIcons/WalletIcons';
import MenuProvider from '../../MenuProvider';
import Modal from '../../modal/modal';

const UserCurrencyConvertConfirmModal = lazy(() => import('./UserCurrencyConvertConfirmModal'));

const UserCurrencyConvertModal = observer(
  ({ userCurrencyConvertModal, setUserCurrencyConvertModal, currencyToChange }) => {
    const { wallet, currency, user } = useStore();

    const [convertConfirmModal, setConvertConfirmModal] = useState({ show: false, cb: undefined });

    const handleCloseClick = () => {
      setUserCurrencyConvertModal({
        show: false,
        currencyToChange: currency.userCurrency.id
      });
    };

    const { rate: currencyToChangeRate, symbol: currencyToChangeSymbol } = currency.exchangeRates.find(
      (rate) => rate.id === currencyToChange
    );

    const handleOpenConvertConfirmModal = (cb) => {
      setConvertConfirmModal({ show: true, cb });
    };

    const handleConvertClick = () => {
      user.changeCurrencyId(currencyToChange, currencyToChangeRate, true).finally(() => {
        setUserCurrencyConvertModal({ show: false });
      });
    };

    const handleNotConvertClick = () => {
      user.changeCurrencyId(currencyToChange, currencyToChangeRate, false).finally(() => {
        setUserCurrencyConvertModal({ show: false });
      });
    };
    return (
      <>
        <Modal active={userCurrencyConvertModal} setActive={handleCloseClick} id="wallet">
          <MenuProvider.Actions onClose={handleCloseClick}>
            <h3>Convert wallets</h3>
          </MenuProvider.Actions>
          <MenuProvider.Container fluid>
            <p>Do you want to convert your wallets balance?</p>

            <div className="overflow-auto mb-4">
              {wallet.wallets.map((walletsMap) => (
                <div
                  className="w-100 mb-2 d-flex rounded items-center align-items-center justify-content-between"
                  key={walletsMap.id}
                >
                  <WalletIcon />
                  <p className="fs-4 mb-0">{walletsMap.name}</p>
                  <p className="fs-6 mb-0">
                    {walletsMap.balance.toFixed(2)} {currency.userCurrency.symbol}
                  </p>
                  <ConvertIcon />
                  <p className="fs-6 mb-0">
                    {(walletsMap.balance * currencyToChangeRate).toFixed(2)} {currencyToChangeSymbol}
                  </p>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between">
              <Button
                className="px-5 bg-light-blue border-0"
                onClick={() => handleOpenConvertConfirmModal(handleConvertClick)}
              >
                Yes
              </Button>
              <Button
                className="px-5 bg-main-blue border-0"
                onClick={() => handleOpenConvertConfirmModal(handleNotConvertClick)}
              >
                No
              </Button>
            </div>
          </MenuProvider.Container>
        </Modal>
        <Suspense>
          {convertConfirmModal.show && (
            <UserCurrencyConvertConfirmModal
              convertConfirmModal={convertConfirmModal.show}
              setConfirmConfirmModal={setConvertConfirmModal}
              onConfirm={convertConfirmModal.cb}
            />
          )}
        </Suspense>
      </>
    );
  }
);

export default UserCurrencyConvertModal;
