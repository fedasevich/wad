import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useStore } from '../../../../store';
import { PersistTransactionFilter } from '../PersistTransactionFilter';

jest.mock('../../../../store');

describe('PersistTransactionFilter.js', () => {
  it('calls setPersistTransactionFilter with true when the checkbox is clicked', () => {
    render(<PersistTransactionFilter />);
    const checkbox = screen.getByLabelText('Persist transaction filter');
    fireEvent.click(checkbox);

    expect(useStore().userSettings.setPersistTransactionFilter).toHaveBeenCalledWith(true);
  });
});
