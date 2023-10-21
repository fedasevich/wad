import { INTEGER_FORMATTER } from '../constants/constants';

export const formatOperand = (operand) => {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer);
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};
