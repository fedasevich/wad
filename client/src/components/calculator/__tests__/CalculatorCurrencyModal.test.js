import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockExchangeRates, mockUserCurrency } from '../../../../setupTests';
import CalculatorCurrencyModal from '../CalculatorCurrencyModal';

jest.mock('../../../store');
jest.mock('../../modal/modal');

describe('CalculatorCurrencyModal.js', () => {
  it('displays the correct currency symbols', () => {
    render(
      <CalculatorCurrencyModal
        calculatorCurrencyModalActive
        setCalculatorCurrencyModalActive={jest.fn()}
        setSelectedCurrency={jest.fn()}
        selectedCurrency={mockUserCurrency}
      />
    );

    expect(screen.getByText('Choose currency')).toBeInTheDocument();
    mockExchangeRates.forEach((exchangeRate) => {
      expect(screen.getByText(exchangeRate.currency)).toBeInTheDocument();
      expect(screen.getByText(exchangeRate.symbol)).toBeInTheDocument();
    });

    expect(
      screen.getByRole('radio', {
        name: mockUserCurrency.currency
      })
    ).toBeChecked();
  });

  it('calls setSelectedCurrency when a currency is selected', () => {
    const setSelectedCurrencyMock = jest.fn();
    render(
      <CalculatorCurrencyModal
        calculatorCurrencyModalActive
        setCalculatorCurrencyModalActive={jest.fn()}
        setSelectedCurrency={setSelectedCurrencyMock}
        selectedCurrency={mockUserCurrency}
      />
    );
    const selectedCurrency = mockExchangeRates[0];

    const euroRadio = screen.getByLabelText(selectedCurrency.currency);
    fireEvent.click(euroRadio);

    expect(setSelectedCurrencyMock).toHaveBeenCalledWith(selectedCurrency);
  });
});
