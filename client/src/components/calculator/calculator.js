import { observer } from 'mobx-react-lite';
import React, { useReducer, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useStore } from '../../store';
import { ArrowDownIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import CalculatorCurrencyModal from './CalculatorCurrencyModal';
import './CalculatorStyle.css';
import DigitButton from './DigitButton';
import OperationButton from './OperationDigit';
import {
  ACTIONS,
  BACK_SYMBOL,
  DIVIDE_SYMBOL,
  EVALUATE_SYMBOL,
  MINUS_SYMBOL,
  MULTIPLY_SYMBOL,
  PLUS_SYMBOL,
  SUBMIT_SYMBOL
} from './libs/constants/constants';
import { calculatorReducer } from './libs/helpers/calculatorReducer';
import { formatOperand } from './libs/helpers/formatOperand';

const Calculator = observer(({ onSubmit, calculatorColor, topText }) => {
  const { currency } = useStore();

  const [calculatorCurrencyModalActive, setCalculatorCurrencyModalActive] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState(currency.userCurrency);

  const [{ currentOperand = '0', previousOperand, operation }, dispatch] = useReducer(calculatorReducer, {});
  const [description, setDescription] = useState('');

  const handleCurrencyClick = () => setCalculatorCurrencyModalActive(true);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEvaluate = () => dispatch({ type: ACTIONS.EVALUATE });

  const handleSubmit = () => {
    if (currentOperand === '0') {
      return toast.error('Amount spent cannot be 0.');
    }

    if (currentOperand < 0) {
      return toast.error('Amount spent cannot be negative.');
    }

    const exchangedCurrentOperand = Number(currentOperand) / selectedCurrency.rate;

    onSubmit({ currentOperand: exchangedCurrentOperand, description });
    setDescription('');
    dispatch({ type: ACTIONS.CLEAR });
  };

  return (
    <div>
      <div className="calculator">
        <div className="item sum">
          <h6 className="mt-3 fw-light" style={{ color: calculatorColor }}>
            {topText}
          </h6>
          <button type="button" className="p-0 ps-2" onClick={handleCurrencyClick}>
            <p className="fs-3 text-break spent d-flex align-items-center gap-1" style={{ color: calculatorColor }}>
              {formatOperand(previousOperand)} {operation} {formatOperand(currentOperand)} {selectedCurrency.symbol}
              <ArrowDownIcon />
            </p>
          </button>
          <input
            type="text"
            name="description"
            className="w-100 text-center"
            placeholder="Description"
            onChange={handleDescriptionChange}
            value={description}
          />
        </div>

        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation={DIVIDE_SYMBOL} dispatch={dispatch} />
        <button type="button" className="item back" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          {BACK_SYMBOL}
        </button>

        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation={MULTIPLY_SYMBOL} dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation={MINUS_SYMBOL} dispatch={dispatch} />
        {operation ? (
          <button
            type="button"
            className="item submit"
            style={{ backgroundColor: calculatorColor }}
            onClick={handleEvaluate}
          >
            {EVALUATE_SYMBOL}
          </button>
        ) : (
          <button
            type="button"
            className="item submit"
            style={{ backgroundColor: calculatorColor }}
            onClick={handleSubmit}
          >
            {SUBMIT_SYMBOL}
          </button>
        )}

        <DigitButton className="zero" digit="0" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <OperationButton operation={PLUS_SYMBOL} dispatch={dispatch} />
      </div>

      {calculatorCurrencyModalActive && (
        <CalculatorCurrencyModal
          calculatorCurrencyModalActive={calculatorCurrencyModalActive}
          setCalculatorCurrencyModalActive={setCalculatorCurrencyModalActive}
          setSelectedCurrency={setSelectedCurrency}
          selectedCurrency={selectedCurrency}
        />
      )}
    </div>
  );
});

export default Calculator;
