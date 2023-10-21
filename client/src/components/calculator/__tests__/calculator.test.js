import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mockUserCurrency } from '../../../../setupTests';
import Calculator from '../calculator';

jest.mock('../../../store');

describe('calculator.js', () => {
  it('renders with default values', () => {
    render(<Calculator onSubmit={jest.fn()} calculatorColor="green" topText="Test Calculator" />);
    expect(screen.getByText('Test Calculator')).toBeInTheDocument();
    expect(screen.getByText(`0 ${mockUserCurrency.symbol}`)).toBeInTheDocument();
  });

  it('updates the description input', () => {
    render(<Calculator onSubmit={jest.fn()} calculatorColor="green" topText="Test Calculator" />);
    const descriptionInput = screen.getByPlaceholderText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Test Expense' } });
    expect(descriptionInput.value).toBe('Test Expense');
  });

  it('handles digit button clicks', () => {
    render(<Calculator onSubmit={jest.fn()} calculatorColor="green" topText="Test Calculator" />);
    const digit7Button = screen.getByText('7');
    fireEvent.click(digit7Button);
    expect(screen.getByText(`7 ${mockUserCurrency.symbol}`)).toBeInTheDocument();
  });

  it('handles operation button clicks', () => {
    render(<Calculator onSubmit={jest.fn()} calculatorColor="green" topText="Test Calculator" />);
    const digit7Button = screen.getByText('7');
    fireEvent.click(digit7Button);
    const multiplyButton = screen.getByText('Multiply.svg');
    fireEvent.click(multiplyButton);
    expect(screen.getAllByText(`Multiply.svg`)).toHaveLength(2);
  });

  it('handles submission when current operand is valid', async () => {
    const onSubmitMock = jest.fn();
    const { container } = render(
      <Calculator onSubmit={onSubmitMock} calculatorColor="green" topText="Test Calculator" />
    );
    const digit5Button = screen.getByText('5');
    fireEvent.click(digit5Button);
    const multiplyButton = screen.getByText('Multiply.svg');
    fireEvent.click(multiplyButton);
    fireEvent.click(digit5Button);
    const submitButton = container.querySelector('.submit');

    await act(() => {
      userEvent.click(submitButton);
    });

    expect(screen.getByText(`25 ${mockUserCurrency.symbol}`)).toBeInTheDocument();
  });

  it('displays error when current operand is 0', () => {
    const onSubmitMock = jest.fn();
    const { container } = render(
      <Calculator onSubmit={onSubmitMock} calculatorColor="green" topText="Test Calculator" />
    );
    const submitButton = container.querySelector('.submit');
    fireEvent.click(submitButton);
    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it('displays error when current operand is negative', () => {
    const onSubmitMock = jest.fn();
    const { container } = render(
      <Calculator onSubmit={onSubmitMock} calculatorColor="green" topText="Test Calculator" />
    );

    const digit1Button = screen.getByText('1');
    fireEvent.click(digit1Button);

    const digitMinusButton = screen.getByText('Minus.svg');
    fireEvent.click(digitMinusButton);

    const digit2Button = screen.getByText('2');
    fireEvent.click(digit2Button);

    const submitButton = container.querySelector('.submit');
    fireEvent.click(submitButton);
    expect(onSubmitMock).not.toHaveBeenCalled();
  });
});
