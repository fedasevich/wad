import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import OperationButton from '../OperationDigit';
import { ACTIONS } from '../libs/constants/constants';

describe('OperationDigit.js', () => {
  it('renders a button with the provided operation symbol', () => {
    render(<OperationButton dispatch={jest.fn()} operation="+" />);
    const button = screen.getByText('+');
    expect(button).toBeInTheDocument();
  });

  it('dispatches CHOOSE_OPERATION action when clicked', () => {
    const dispatchMock = jest.fn();
    render(<OperationButton dispatch={dispatchMock} operation="-" />);
    const button = screen.getByText('-');
    fireEvent.click(button);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ACTIONS.CHOOSE_OPERATION,
      payload: { operation: '-' }
    });
  });

  it('handles different operation symbols correctly', () => {
    const dispatchMock = jest.fn();
    const symbols = ['+', '-', '*', '/'];
    symbols.forEach((symbol) => {
      render(<OperationButton dispatch={dispatchMock} operation={symbol} />);
      const button = screen.getByText(symbol);
      fireEvent.click(button);
      expect(dispatchMock).toHaveBeenCalledWith({
        type: ACTIONS.CHOOSE_OPERATION,
        payload: { operation: symbol }
      });
      dispatchMock.mockClear();
    });
  });
});
