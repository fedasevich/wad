import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../store';
import MenuProvider from '../MenuProvider';
import Modal from '../modal/modal';

const CalculatorCurrencyModal = observer(
  ({ calculatorCurrencyModalActive, setCalculatorCurrencyModalActive, setSelectedCurrency }) => {
    const { currency } = useStore();
    const handleCurrencySelect = (rate) => {
      setSelectedCurrency(rate);
      setCalculatorCurrencyModalActive(false);
    };

    return (
      <Modal active={calculatorCurrencyModalActive} setActive={setCalculatorCurrencyModalActive} id="currency">
        <MenuProvider.Header>
          <h2>Choose currency</h2>
        </MenuProvider.Header>
        <MenuProvider.Container>
          <div className="overflow-auto vh-50 ">
            {currency.exchangeRates.map((rate) => (
              <button
                type="button"
                className="d-flex align-items-center justify-content-start w-100 text-start mb-2 modal_item  p-2"
                onClick={() => handleCurrencySelect(rate)}
                key={rate.id}
              >
                <div className="categoryIcon bg-main-blue text-white component-one-third-border-radius">
                  {rate.symbol}
                </div>
                <p className="ms-3 mb-0 fs-6">{rate.currency}</p>
              </button>
            ))}
          </div>
        </MenuProvider.Container>
      </Modal>
    );
  }
);

export default CalculatorCurrencyModal;
