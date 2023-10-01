import { observer } from 'mobx-react-lite';
import React, { useEffect, useReducer, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useStore } from '../../store';
import { getCategoryBackgroundColorByIconId } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import { ArrowDownIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import CalculatorCategoryModal from './CalculatorCategoryModal';
import CalculatorCurrencyModal from './CalculatorCurrencyModal';
import './CalculatorStyle.css';
import CalculatorWalletModal from './CalculatorWalletModal';
import DigitButton from './DigitButtons';
import OperationButton from './OperationDigit';
import {
  ACTIONS,
  BACK_SYMBOL,
  DIVIDE_SYMBOL,
  EVALUATE_SYMBOL,
  INTEGER_FORMATTER,
  MULTIPLY_SYMBOL,
  SUBMIT_SYMBOL
} from './utils/constants';

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (Number.isNaN(previous) || Number.isNaN(current)) {
    return '';
  }
  let computation = '';
  switch (operation) {
    case '+':
      computation = previous + current;
      break;
    case '-':
      computation = previous - current;
      break;
    case MULTIPLY_SYMBOL:
      computation = previous * current;
      break;
    case DIVIDE_SYMBOL:
      if (current === 0) {
        return '0';
      }
      computation = previous / current;
      break;
    default:
      break;
  }
  return computation % 1 === 0 ? computation.toString() : computation.toFixed(2).toString();
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        };
      }
      if (payload.digit === '0' && state.currentOperand === '0') return state;
      if (state.currentOperand === '0' && payload.digit !== '.') {
        return {
          ...state,
          currentOperand: `${payload.digit}`
        };
      }
      if (payload.digit === '.' && state.currentOperand?.includes('.')) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (Object.keys(state).length === 0) {
        return state;
      }
      if ((state.currentOperand === null && state.previousOperand === null) || state.currentOperand === '0') {
        return state;
      }

      if (state.currentOperand === '0') {
        return state;
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        };
      }
      if (state.currentOperand === null) {
        return {
          ...state,
          operation: payload.operation
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      };
    case ACTIONS.EVALUATE:
      if (state.operation === null || state.operation === null || state.previousOperand === null) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: '0'
        };
      }
      if (state.currentOperand == null || state.currentOperand === '0') return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: '0'
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      };
    case ACTIONS.CLEAR:
      return {};
    default:
      return state;
  }
};

const formatOperand = (operand) => {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer);
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};

const Calculator = observer(({ walletId, categoryId, onSubmit }) => {
  const { wallet, category, userSettings, currency } = useStore();
  const [walletModalActive, setWalletModalActive] = useState(false);
  const [categoryModalActive, setCategoryModalActive] = useState(false);
  const [calculatorCurrencyModalActive, setCalculatorCurrencyModalActive] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState(currency.userCurrency);
  const [selectedWallet, setSelectedWallet] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [{ currentOperand = '0', previousOperand, operation }, dispatch] = useReducer(reducer, {});
  const [description, setDescription] = useState('');

  useEffect(() => {
    setSelectedWallet(wallet.getWalletById(walletId) || wallet.wallets[0]);
  }, [walletId, wallet]);

  useEffect(() => {
    setSelectedCategory(category.getRegularCategoryById(categoryId) || category.categories[0]);
  }, [categoryId, category]);

  const handleWalletClick = () => setWalletModalActive(true);
  const handleCategoryClick = () => setCategoryModalActive(true);
  const handleCurrencyClick = () => setCalculatorCurrencyModalActive(true);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDeleteDigit = () => dispatch({ type: ACTIONS.EVALUATE });

  const handleSubmit = () => {
    if (currentOperand === '0') {
      return toast.error('Amount spent cannot be 0.');
    }

    if (currentOperand < 0) {
      return toast.error('Amount spent cannot be negative.');
    }

    const exchangedCurrentOperand = Number(currentOperand) / selectedCurrency.rate;

    category.createTransaction(exchangedCurrentOperand, selectedCategory, selectedWallet, description, wallet);
    setDescription('');
    dispatch({ type: ACTIONS.CLEAR });
    if (userSettings.closeCalculatorOnSubmit) {
      onSubmit();
    }
  };

  return (
    <div>
      <div className="calculator">
        <button type="button" className="item wallet" onClick={handleWalletClick}>
          <h4> {selectedWallet.name}</h4>
          {'\n'}
          <h5>
            {selectedWallet.balance && selectedWallet.balance.toFixed(2)} {currency.userCurrency.symbol}
          </h5>
        </button>
        <button
          type="button"
          className="item category"
          onClick={handleCategoryClick}
          style={{
            backgroundColor: getCategoryBackgroundColorByIconId(
              selectedCategory.iconId || category.categories[0].iconId
            )
          }}
        >
          <h4>{selectedCategory.name}</h4>
        </button>
        <div className="item sum">
          <h6 className="mt-3 fw-light">Expense</h6>
          <button type="button" className="p-0 ps-2" onClick={handleCurrencyClick}>
            <p className="fs-3 text-break spent">
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
        <OperationButton operation="-" dispatch={dispatch} />
        {operation ? (
          <button type="button" className="item submit" onClick={handleDeleteDigit}>
            {EVALUATE_SYMBOL}
          </button>
        ) : (
          <button type="button" className="item submit" onClick={handleSubmit}>
            {SUBMIT_SYMBOL}
          </button>
        )}

        <DigitButton className="zero" digit="0" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
      </div>
      {!walletId && (
        <CalculatorWalletModal
          walletModalActive={walletModalActive}
          setWalletModalActive={setWalletModalActive}
          setSelectedWallet={setSelectedWallet}
        />
      )}
      {!categoryId && (
        <CalculatorCategoryModal
          categoryModalActive={categoryModalActive}
          setCategoryModalActive={setCategoryModalActive}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {calculatorCurrencyModalActive && (
        <CalculatorCurrencyModal
          calculatorCurrencyModalActive={calculatorCurrencyModalActive}
          setCalculatorCurrencyModalActive={setCalculatorCurrencyModalActive}
          setSelectedCurrency={setSelectedCurrency}
        />
      )}
    </div>
  );
});

export default Calculator;
