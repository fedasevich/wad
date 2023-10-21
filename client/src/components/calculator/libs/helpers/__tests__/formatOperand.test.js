import { INTEGER_FORMATTER } from '../../constants/constants';
import { formatOperand } from '../formatOperand';

describe('formatOperand.js', () => {
  it('should return undefined for null operand', () => {
    const operand = null;
    const result = formatOperand(operand);
    expect(result).toBeUndefined();
  });

  it('should format integer operand correctly', () => {
    const operand = '1234567';
    const result = formatOperand(operand);
    const expected = INTEGER_FORMATTER.format(operand);
    expect(result).toBe(expected);
  });

  it('should format operand with decimal correctly', () => {
    const operand = '1234567.89';
    const result = formatOperand(operand);
    const [integer, decimal] = operand.split('.');
    const expected = `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
    expect(result).toBe(expected);
  });

  it('should return 0.00 for operand "0"', () => {
    const operand = '0';
    const result = formatOperand(operand);
    expect(result).toBe('0');
  });

  it('should return "1,234,567.00" for operand "1234567.00"', () => {
    const operand = '1234567.00';
    const result = formatOperand(operand);
    expect(result).toBe('1\u00A0234\u00A0567.00');
  });

  it('should handle missing decimal part and format integer correctly', () => {
    const operand = '98765.';
    const result = formatOperand(operand);
    expect(result).toBe('98\u00A0765.');
  });
});
