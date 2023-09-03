import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useStore } from '../../../../store';
import { themes } from '../../../../utils/constants';
import { Theme } from '../Theme';

jest.mock('../../../../store');

describe('Theme.js', () => {
  it('should render options based on authRoutes', () => {
    render(<Theme />);

    Object.values(themes).forEach((theme) => {
      const option = screen.getByText(theme);
      expect(option).toBeInTheDocument();
    });
  });

  it('should call setStartPage with DARK when an option is selected', () => {
    render(<Theme />);
    const theme = themes.DARK;
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: theme } });

    expect(select).toHaveValue(theme);

    expect(useStore().userSettings.setTheme).toHaveBeenCalledWith(theme);
  });
});
