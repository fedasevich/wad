import { DIVIDE_SYMBOL, MINUS_SYMBOL, MULTIPLY_SYMBOL, PLUS_SYMBOL } from '../../constants/constants';
import { calculatorEvaluate } from '../calculatorEvaluate';

describe('calculatorEvaluate.js', () => {
  it('should return the sum of two numbers', () => {
    expect(calculatorEvaluate({ currentOperand: '2', previousOperand: '3', operation: PLUS_SYMBOL })).toBe('5');
  });

  it('should return the difference of two numbers', () => {
    expect(calculatorEvaluate({ currentOperand: '5', previousOperand: '3', operation: MINUS_SYMBOL })).toBe('-2');
  });

  it('should return the product of two numbers', () => {
    expect(calculatorEvaluate({ currentOperand: '4', previousOperand: '2', operation: MULTIPLY_SYMBOL })).toBe('8');
  });

  it('should return the division of two numbers', () => {
    expect(calculatorEvaluate({ currentOperand: '6', previousOperand: '2', operation: DIVIDE_SYMBOL })).toBe('0.33');
  });

  it('should return the division of two numbers', () => {
    expect(calculatorEvaluate({ currentOperand: '5', previousOperand: '10', operation: DIVIDE_SYMBOL })).toBe('2');
  });

  it('should handle division by zero and return "0"', () => {
    expect(calculatorEvaluate({ currentOperand: '2', previousOperand: '0', operation: DIVIDE_SYMBOL })).toBe('0');
  });

  it('should handle division by zero and return "0"', () => {
    expect(calculatorEvaluate({ currentOperand: '0', previousOperand: '10', operation: DIVIDE_SYMBOL })).toBe('0');
  });

  it('should return an empty string for invalid input', () => {
    expect(calculatorEvaluate({ currentOperand: 'abc', previousOperand: '3', operation: PLUS_SYMBOL })).toBe('');
    expect(calculatorEvaluate({ currentOperand: '2', previousOperand: 'def', operation: PLUS_SYMBOL })).toBe('');
  });

  it('should handle floating-point results and return them with two decimal places', () => {
    expect(calculatorEvaluate({ currentOperand: '1', previousOperand: '3', operation: DIVIDE_SYMBOL })).toBe('3');
    expect(calculatorEvaluate({ currentOperand: '0.1', previousOperand: '0.2', operation: MULTIPLY_SYMBOL })).toBe(
      '0.02'
    );
  });
});
