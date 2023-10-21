import {
  BackspaceIcon,
  DivideIcon,
  EqualsIcon,
  MinusIcon,
  MultiplyIcon,
  PlusIcon
} from '../../../../ui/Icons/CalculatorIcons/CalculatorIcons';
import { CheckMarkIcon } from '../../../../ui/Icons/ControlIcons/ControlIcons';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
  CLEAR: 'clear'
};

export const DIVIDE_SYMBOL = <DivideIcon />;
export const BACK_SYMBOL = <BackspaceIcon />;
export const MULTIPLY_SYMBOL = <MultiplyIcon />;
export const SUBMIT_SYMBOL = <CheckMarkIcon />;
export const EVALUATE_SYMBOL = <EqualsIcon />;
export const MINUS_SYMBOL = <MinusIcon />;
export const PLUS_SYMBOL = <PlusIcon />;

export const INTEGER_FORMATTER = new Intl.NumberFormat('ru', {
  maximumFractionDigits: 0
});
