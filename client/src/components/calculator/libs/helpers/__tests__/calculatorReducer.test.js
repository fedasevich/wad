import { ACTIONS, MINUS_SYMBOL, PLUS_SYMBOL } from '../../constants/constants';
import { calculatorEvaluate } from '../calculatorEvaluate';
import { calculatorReducer } from '../calculatorReducer';

describe('calculatorReducer.js', () => {
  it('should handle ADD_DIGIT action when overwriting', () => {
    const initialState = { currentOperand: '5', overwrite: true };
    const action = { type: ACTIONS.ADD_DIGIT, payload: { digit: '3' } };
    const nextState = calculatorReducer(initialState, action);
    expect(nextState).toEqual({ currentOperand: '3', overwrite: false });
  });

  it('should handle ADD_DIGIT action when input is "0"', () => {
    const initialState = { currentOperand: '0' };
    const action = { type: ACTIONS.ADD_DIGIT, payload: { digit: '3' } };
    const nextState = calculatorReducer(initialState, action);
    expect(nextState).toEqual({ currentOperand: '3' });
  });

  it('should handle ADD_DIGIT action with "."', () => {
    const initialState = { currentOperand: '2' };
    const firstAction = { type: ACTIONS.ADD_DIGIT, payload: { digit: '.' } };
    const firstNextState = calculatorReducer(initialState, firstAction);
    expect(firstNextState).toEqual({ currentOperand: '2.' });

    const secondAction = { type: ACTIONS.ADD_DIGIT, payload: { digit: '.' } };
    const secondNextState = calculatorReducer(firstNextState, secondAction);
    expect(secondNextState).toEqual({ currentOperand: '2.' });

    const thirdAction = { type: ACTIONS.ADD_DIGIT, payload: { digit: '5' } };
    const thirdNextState = calculatorReducer(secondNextState, thirdAction);
    expect(thirdNextState).toEqual({ currentOperand: '2.5' });
  });

  it('should handle ADD_DIGIT action for appending digits', () => {
    const initialState = { currentOperand: '3' };
    const action = { type: ACTIONS.ADD_DIGIT, payload: { digit: '7' } };
    const nextState = calculatorReducer(initialState, action);
    expect(nextState).toEqual({ currentOperand: '37' });
  });

  it('should handle CHOOSE_OPERATION action with initial state', () => {
    const initialState = {};
    const action = { type: ACTIONS.CHOOSE_OPERATION, payload: { operation: PLUS_SYMBOL } };
    const nextState = calculatorReducer(initialState, action);
    expect(nextState).toEqual({});
  });

  it('should handle CHOOSE_OPERATION action with valid state', () => {
    const initialState = { currentOperand: '4', operation: null, previousOperand: null };
    const action = { type: ACTIONS.CHOOSE_OPERATION, payload: { operation: MINUS_SYMBOL } };
    const nextState = calculatorReducer(initialState, action);
    expect(nextState).toEqual({
      currentOperand: null,
      operation: MINUS_SYMBOL,
      previousOperand: '4'
    });
  });

  it('should handle EVALUATE action with invalid state', () => {
    const initialState = {};
    const action = { type: ACTIONS.EVALUATE };
    const nextState = calculatorReducer(initialState, action);
    expect(nextState).toEqual({
      currentOperand: '',
      operation: null,
      overwrite: true,
      previousOperand: null
    });
  });

  it('should handle EVALUATE action with valid state', () => {
    const initialState = {
      currentOperand: '6',
      operation: PLUS_SYMBOL,
      previousOperand: '3'
    };
    const action = { type: ACTIONS.EVALUATE };
    const nextState = calculatorReducer(initialState, action);
    const expectedResult = calculatorEvaluate(initialState);
    expect(nextState).toEqual({
      overwrite: true,
      previousOperand: null,
      operation: null,
      currentOperand: expectedResult
    });
  });

  it('should handle DELETE_DIGIT action when overwriting', () => {
    const initialState = { currentOperand: '7', overwrite: true };
    const action = { type: ACTIONS.DELETE_DIGIT };
    const nextState = calculatorReducer(initialState, action);
    expect(nextState).toEqual({ currentOperand: '0', overwrite: false });
  });

  it('should handle DELETE_DIGIT action when currentOperand is "0"', () => {
    const initialState = { currentOperand: '0' };
    const action = { type: ACTIONS.DELETE_DIGIT };
    const nextState = calculatorReducer(initialState, action);
    expect(nextState).toEqual({ currentOperand: '0' });
  });

  it('should handle DELETE_DIGIT action for removing last digit', () => {
    const initialState = { currentOperand: '42' };
    const action = { type: ACTIONS.DELETE_DIGIT };
    const nextState = calculatorReducer(initialState, action);
    expect(nextState).toEqual({ currentOperand: '4' });
  });

  it('should handle CLEAR action', () => {
    const initialState = { currentOperand: '5', operation: PLUS_SYMBOL, previousOperand: '2' };
    const action = { type: ACTIONS.CLEAR };
    const nextState = calculatorReducer(initialState, action);
    expect(nextState).toEqual({});
  });

  it('should handle unknown action type', () => {
    const initialState = {};
    const action = { type: 'UNKNOWN_ACTION' };
    const nextState = calculatorReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });
});
