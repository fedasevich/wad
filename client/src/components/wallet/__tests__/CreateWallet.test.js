import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockWallet1 } from '../../../../setupTests';
import { DispatchContext } from '../../../pages/MainPage';
import { useStore } from '../../../store';
import { WALLET_PAGE_STATE } from '../../../utils/constants';
import CreateWallet from '../CreateWallet';

jest.mock('../../../store');

const mockDispatch = jest.fn();

const mockWalletName = mockWallet1.name;

describe('CreateWallet.js', () => {
  beforeEach(() => {
    render(
      <DispatchContext.Provider value={mockDispatch}>
        <CreateWallet />
      </DispatchContext.Provider>
    );
  });

  it('closes create wallet on close click', () => {
    const cancelButton = screen.getByTestId('menu-cancel-button');
    fireEvent.click(cancelButton);

    expect(mockDispatch).toHaveBeenCalledWith({ operation: WALLET_PAGE_STATE.DEFAULT_WALLET, id: -1 });
  });

  it('updates wallet name when input value changes', () => {
    const nameInput = screen.getByLabelText(/Enter name:/i);
    fireEvent.change(nameInput, { target: { value: mockWalletName } });
    expect(nameInput.value).toBe(mockWalletName);
  });

  it('calls createWallet and resets state on commit', () => {
    const nameInput = screen.getByLabelText(/Enter name:/i);
    const commitButton = screen.getByTestId('menu-commit-button');
    fireEvent.change(nameInput, { target: { value: mockWalletName } });
    fireEvent.click(commitButton);
    expect(useStore().wallet.createWallet).toHaveBeenCalledWith(mockWalletName);

    expect(nameInput.value).toBe('');
  });
});
