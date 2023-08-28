import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import WalletActions, { WALLET_ACTIONS_AND_ICONS } from '../WalletActions';

jest.mock('mobx-react-lite', () => ({
  observer: jest.fn((component) => component)
}));

describe('WalletActions.js', () => {
  it('renders all wallet action buttons correctly', () => {
    render(<WalletActions dispatch={() => undefined} id={1} />);
    const actionButtons = screen.getAllByRole('button');

    expect(actionButtons).toHaveLength(WALLET_ACTIONS_AND_ICONS.length);
  });

  it('dispatches the correct action when a button is clicked', () => {
    const dispatchMock = jest.fn();
    render(<WalletActions dispatch={dispatchMock} id={1} />);

    WALLET_ACTIONS_AND_ICONS.forEach((actionAndIcon) => {
      const button = screen.getByText(actionAndIcon.name);
      fireEvent.click(button);

      expect(dispatchMock).toHaveBeenCalledWith({
        operation: actionAndIcon.action,
        id: 1
      });
    });
  });

  it('matches snapshot', () => {
    const { container } = render(<WalletActions dispatch={() => undefined} id={1} />);
    expect(container).toMatchSnapshot();
  });
});
