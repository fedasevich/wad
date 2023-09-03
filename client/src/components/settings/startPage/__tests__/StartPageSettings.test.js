import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { authRoutes } from '../../../../routes';
import { useStore } from '../../../../store';
import { StartPageSettings } from '../StartPageSettings';

jest.mock('../../../../store');

describe('StartPageSettings.js', () => {
  it('should render options based on authRoutes', () => {
    render(<StartPageSettings />);

    authRoutes.forEach((route) => {
      const option = screen.getByText(route.path);
      expect(option).toBeInTheDocument();
    });
  });

  it('should call setStartPage when an option is selected', () => {
    render(<StartPageSettings />);
    const { path } = authRoutes[1];
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: path } });

    expect(select).toHaveValue(path);

    expect(useStore().userSettings.setStartPage).toHaveBeenCalledWith(path);
  });
});
