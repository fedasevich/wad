import { DIVIDE_SYMBOL, MINUS_SYMBOL, MULTIPLY_SYMBOL, PLUS_SYMBOL } from '../constants/constants';

export const calculatorEvaluate = ({ currentOperand, previousOperand, operation }) => {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (Number.isNaN(previous) || Number.isNaN(current)) {
    return '';
  }

  let computation = '';

  switch (operation) {
    case PLUS_SYMBOL:
      computation = previous + current;
      break;
    case MINUS_SYMBOL:
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

  return Number.isInteger(computation) ? computation.toString() : computation.toFixed(2);
};
