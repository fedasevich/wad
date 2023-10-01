import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockWallet1 } from '../../../../setupTests';
import { DispatchContext } from '../../../pages/MainPage';
import { useStore } from '../../../store';
import { WALLET_PAGE_STATE } from '../../../utils/constants';
import EditWallet from '../EditWallet';

jest.mock('../../../store');

const { name, balance } = mockWallet1;

const mockDispatch = jest.fn();

function setInputAndCheckValue(labelRegExp, value) {
  const input = screen.getByLabelText(labelRegExp);
  fireEvent.change(input, { target: { value } });
  return input.value;
}

Element.prototype.scrollIntoView = jest.fn();
describe('EditWallet.js', () => {
  beforeEach(() => {
    render(
      <DispatchContext.Provider value={mockDispatch}>
        <EditWallet id={1} />
      </DispatchContext.Provider>
    );
  });

  it('closes create wallet on close click', () => {
    const cancelButton = screen.getByTestId('menu-cancel-button');
    fireEvent.click(cancelButton);

    expect(mockDispatch).toHaveBeenCalledWith({ operation: WALLET_PAGE_STATE.DEFAULT_WALLET, id: -1 });
  });

  it('updates wallet name when input value changes', () => {
    expect(setInputAndCheckValue(/Enter new name:/i, name)).toBe(name.toString());
  });

  it('updates wallet balance when input value changes', () => {
    expect(setInputAndCheckValue(/Enter new balance:/i, balance)).toBe(balance.toString());
  });

  it('calls editWallet and resets state on commit', () => {
    const commitButton = screen.getByTestId('menu-commit-button');
    setInputAndCheckValue(/Enter new name:/i, name);
    setInputAndCheckValue(/Enter new balance:/i, balance);

    fireEvent.click(commitButton);
    expect(useStore().wallet.editWallet).toHaveBeenCalledWith(1, 'Card 0', '1000');
  });
});
