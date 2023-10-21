import { ACTIONS } from '../constants/constants';
import { calculatorEvaluate } from './calculatorEvaluate';

export const calculatorReducer = (state, { type, payload }) => {
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
        previousOperand: calculatorEvaluate(state),
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
        currentOperand: calculatorEvaluate(state)
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
