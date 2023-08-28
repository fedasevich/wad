import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockWallet1, mockWallets } from '../../../../setupTests';
import { DispatchContext } from '../../../pages/MainPage';
import Wallets from '../Wallets';

jest.mock('../../../store');

const mockDispatch = jest.fn();

const renderWalletsWithDispatch = () => {
  return render(
    <DispatchContext.Provider value={mockDispatch}>
      <Wallets />
    </DispatchContext.Provider>
  );
};

Element.prototype.scrollIntoView = jest.fn();
describe('EditWallet.js', () => {
  it('renders wallet cards and "Add wallet" button', () => {
    const { container } = renderWalletsWithDispatch();
    expect(container.querySelectorAll('.wallet')).toHaveLength(mockWallets.length);
    expect(screen.getByText('Add wallet')).toBeInTheDocument();
  });

  it('toggles wallet actions on click', async () => {
    const mockWallet = mockWallet1;
    const { container } = renderWalletsWithDispatch();

    fireEvent.click(screen.getByText(new RegExp(mockWallet.name, 'i')));

    expect(container.querySelector('.accordion-collapse')).toBeVisible();
  });

  it('handles "Add wallet" button click', () => {
    renderWalletsWithDispatch();

    fireEvent.click(screen.getByText(/Add wallet/i));

    expect(mockDispatch).toHaveBeenCalledWith({
      operation: 'CREATE_WALLET',
      id: -1
    });
  });
});
