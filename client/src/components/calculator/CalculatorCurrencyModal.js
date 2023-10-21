import { observer } from 'mobx-react-lite';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useStore } from '../../store';
import MenuProvider from '../MenuProvider';
import Modal from '../modal/modal';

const CalculatorCurrencyModal = observer(
  ({ calculatorCurrencyModalActive, setCalculatorCurrencyModalActive, setSelectedCurrency, selectedCurrency }) => {
    const { currency } = useStore();
    const handleCurrencySelect = (event) => {
      const selectedCurrency = currency.exchangeRates.find((rate) => rate.id === Number(event.target.value));
      setSelectedCurrency(selectedCurrency);
      setCalculatorCurrencyModalActive(false);
    };

    return (
      <Modal active={calculatorCurrencyModalActive} setActive={setCalculatorCurrencyModalActive} id="currency">
        <MenuProvider.Header>
          <h2>Choose currency</h2>
        </MenuProvider.Header>
        <MenuProvider.Container>
          <div>
            {currency.exchangeRates.map((rate) => (
              <div className="d-flex flex-row mb-2" key={rate.id}>
                <Form.Check
                  type="radio"
                  id={rate.id}
                  name={rate.id}
                  value={rate.id}
                  checked={rate.id === selectedCurrency.id}
                  onChange={handleCurrencySelect}
                />
                <Form.Label className="ms-2" htmlFor={rate.id}>
                  {rate.currency}
                </Form.Label>
                <p className="mb-0 ms-auto">{rate.symbol}</p>
              </div>
            ))}
          </div>
        </MenuProvider.Container>
      </Modal>
    );
  }
);

export default CalculatorCurrencyModal;
