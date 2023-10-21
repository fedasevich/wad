import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { Suspense, lazy, useState } from 'react';
import { useStore } from '../../store';
import { getCategoryBackgroundColorByIconId } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { negateNumber } from '../../utils/constants';
import MenuProvider from '../MenuProvider';
import Loader from '../loader/Loader';
import Modal from '../modal/modal';

const Calculator = lazy(() => import('../calculator/calculator'));
const CalculatorWalletModal = lazy(() => import('../calculator/CalculatorWalletModal'));

const CategoryCalculatorModal = observer(({ selectedCategory, calculatorModal, setCalculatorModal }) => {
  const { userSettings, currency, category, wallet } = useStore();
  const [walletModalActive, setWalletModalActive] = useState(false);

  const [selectedWallet, setSelectedWallet] = useState(wallet.wallets[0]);

  const handleClose = () => {
    setCalculatorModal({ active: false });
  };

  const handleWalletClick = () => setWalletModalActive(true);

  const handleSubmit = ({ currentOperand, description }) => {
    const negativeCurrentOperand = negateNumber(currentOperand);

    category.createTransaction(negativeCurrentOperand, selectedCategory, selectedWallet, description);

    if (userSettings.closeCalculatorOnSubmit) {
      handleClose();
    }
  };

  const categoryBackgroundColor = getCategoryBackgroundColorByIconId(selectedCategory.iconId);

  return (
    <>
      <Modal active={calculatorModal} setActive={handleClose} id="calc">
        <MenuProvider.Header.Straight>
          <MenuProvider.Actions.Cancel onClose={handleClose} />
          <h4>Expense</h4>
        </MenuProvider.Header.Straight>
        <Suspense fallback={<Loader />}>
          <div className="calculatorTopButtons">
            <button type="button" className="bg-light-blue text-white text-start ps-4 py-2" onClick={handleWalletClick}>
              <p className="mb-0">From wallet</p>
              <h4>
                {selectedWallet.name}{' '}
                <span className="fs-5">
                  {selectedWallet.balance.toFixed(2)} {currency.userCurrency.symbol}
                </span>
              </h4>
            </button>
            <button
              type="button"
              className="text-start ps-4 py-2 text-white"
              style={{
                backgroundColor: categoryBackgroundColor
              }}
            >
              <p className="mb-0">To category</p>
              <h4>{selectedCategory.name}</h4>
            </button>
          </div>
          <Calculator onSubmit={handleSubmit} calculatorColor={categoryBackgroundColor} topText="Expense" />
        </Suspense>
        <h6 className="text-center py-2 fw-light"> {format(new Date(), 'd MMMM y')}</h6>
      </Modal>
      <Suspense>
        {walletModalActive && (
          <CalculatorWalletModal
            walletModalActive={walletModalActive}
            setWalletModalActive={setWalletModalActive}
            setSelectedWallet={setSelectedWallet}
          />
        )}
      </Suspense>
    </>
  );
});

export default CategoryCalculatorModal;
