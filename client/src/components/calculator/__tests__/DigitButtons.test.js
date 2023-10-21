import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import DigitButton from '../DigitButton';
import { ACTIONS } from '../libs/constants/constants';

describe('DigitButtons.js', () => {
  it('renders a button with the provided digit', () => {
    render(<DigitButton dispatch={jest.fn()} digit="5" />);
    const button = screen.getByText('5');
    expect(button).toBeInTheDocument();
  });

  it('dispatches ADD_DIGIT action when clicked', () => {
    const dispatchMock = jest.fn();
    render(<DigitButton dispatch={dispatchMock} digit="3" />);
    const button = screen.getByText('3');
    fireEvent.click(button);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ACTIONS.ADD_DIGIT,
      payload: { digit: '3' }
    });
  });

  it('handles "0" digit correctly', () => {
    const dispatchMock = jest.fn();
    render(<DigitButton dispatch={dispatchMock} digit="0" />);
    const button = screen.getByText('0');
    fireEvent.click(button);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ACTIONS.ADD_DIGIT,
      payload: { digit: '0' }
    });
  });

  it('handles "zero" class for the "0" digit', () => {
    render(<DigitButton dispatch={jest.fn()} digit="0" />);
    const button = screen.getByText('0');
    expect(button).toHaveClass('zero');
  });

  it('does not add "zero" class for non-zero digits', () => {
    render(<DigitButton dispatch={jest.fn()} digit="7" />);
    const button = screen.getByText('7');
    expect(button).not.toHaveClass('zero');
  });
});
