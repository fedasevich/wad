import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { lazy, Suspense, useContext } from 'react';
import { DispatchContext } from '../../pages/MainPage';
import { useStore } from '../../store';
import { getCategoryBackgroundColorByIconId } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { WALLET_PAGE_STATE } from '../../utils/constants';
import MenuProvider from '../MenuProvider';
import Loader from '../loader/Loader';

const Calculator = lazy(() => import('../calculator/calculator'));

const WalletRecharge = observer(({ id }) => {
  const dispatch = useContext(DispatchContext);
  const { currency, category, wallet } = useStore();
  const incomeCategory = category.categories.find((category) => category.isIncome);

  const selectedWallet = wallet.getWalletById(id);

  const handleSubmit = ({ currentOperand, description }) => {
    category.createTransaction(currentOperand, incomeCategory, selectedWallet, description);
  };

  const handleClose = () => {
    dispatch({ operation: WALLET_PAGE_STATE.DEFAULT_WALLET, id: -1 });
  };

  const categoryBackgroundColor = getCategoryBackgroundColorByIconId(incomeCategory.iconId);

  return (
    <>
      <MenuProvider>
        <MenuProvider.Header.Straight>
          <MenuProvider.Actions.Cancel onClose={handleClose} />
          <h5>Recharge</h5>
          <h6> {wallet.getWalletById(id).name}</h6>
        </MenuProvider.Header.Straight>
        <Suspense fallback={<Loader />}>
          <div className="calculatorTopButtons">
            <button
              type="button"
              className="text-start ps-4 py-2 text-white"
              style={{
                backgroundColor: categoryBackgroundColor
              }}
            >
              <p className="mb-0">From category</p>
              <h4>{incomeCategory.name}</h4>
            </button>
            <button type="button" className="bg-light-blue text-white text-start ps-4 py-2">
              <p className="mb-0">To wallet</p>
              <h4>
                {selectedWallet.name}{' '}
                <span className="fs-5">
                  {selectedWallet.balance.toFixed(2)} {currency.userCurrency.symbol}
                </span>
              </h4>
            </button>
          </div>
          <Calculator onSubmit={handleSubmit} calculatorColor="bg-main-blue" topText="Income" walletId={id} />
        </Suspense>
        <h6 className="text-center py-2 fw-light"> {format(new Date(), 'd MMMM y')}</h6>
      </MenuProvider>
    </>
  );
});

export default WalletRecharge;
