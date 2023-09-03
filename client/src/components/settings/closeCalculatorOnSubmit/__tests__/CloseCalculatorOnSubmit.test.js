import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useStore } from '../../../../store';
import { CloseCalculatorOnSubmit } from '../CloseCalculatorOnSubmit';

jest.mock('../../../../store');

describe('CloseCalculatorOnSubmit.js', () => {
  it('calls setCloseCalculatorOnSubmit with true when the checkbox is clicked', () => {
    render(<CloseCalculatorOnSubmit />);
    const checkbox = screen.getByLabelText('Close calculator on submit');
    fireEvent.click(checkbox);

    expect(useStore().userSettings.setCloseCalculatorOnSubmit).toHaveBeenCalledWith(true);
  });
});
