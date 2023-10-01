import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { mockExchangeRates } from '../../../../../setupTests';

import { UserCurrencySettings } from '../UserCurrencySettings';

jest.mock('../../../../store');

jest.mock('../UserCurrencyConvertModal', () => ({ currencyToChange }) => (
  <div>{currencyToChange}UserCurrencyConvertModal</div>
));

describe('UserCurrencySettings.js', () => {
  beforeEach(() => {
    render(<UserCurrencySettings />);
  });

  it('should render options based on exchangeRates', () => {
    mockExchangeRates.forEach((rate) => {
      const option = screen.getByText(`${rate.currency} - ${rate.symbol}`);
      expect(option).toBeInTheDocument();
    });
  });

  it('should open modal when an option is selected', async () => {
    const { id } = mockExchangeRates[0];
    const select = screen.getByRole('combobox');

    await act(() => {
      fireEvent.change(select, { target: { value: id } });
    });
    expect(select).toHaveValue(id.toString());

    expect(screen.getByText(new RegExp(`${id}UserCurrencyConvertModal`, 'i'))).toBeInTheDocument();
  });
});
