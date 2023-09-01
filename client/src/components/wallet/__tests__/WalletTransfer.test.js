import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockWallet1, mockWallet2 } from '../../../../setupTests';
import WalletStore from '../../../store/WalletStore';
import WalletTransfer from '../WalletTransfer';

jest.mock('../../../store');

jest.mock('../../../store/WalletStore', () => ({
  transferWallet: jest.fn()
}));

const mockWallet = mockWallet2;

describe('WalletTransfer.js', () => {
  beforeEach(() => {
    render(<WalletTransfer id={mockWallet.id} />);
  });

  it('renders transfer form with initial values', () => {
    expect(screen.getByText(/From:/i)).toBeInTheDocument();
    expect(screen.getByText(/To:/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount:/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /transfer/i
      })
    ).toBeInTheDocument();
  });

  it('handles transfer amount change', () => {
    const amountInput = screen.getByLabelText(/Amount:/i);

    fireEvent.change(amountInput, { target: { value: '100' } });

    expect(amountInput.value).toBe('100');
  });

  it('handles transfer button click', () => {
    const transferButton = screen.getByRole('button', {
      name: /transfer/i
    });
    const nextButton = screen.getAllByText(/Next/i)[0];

    fireEvent.click(nextButton);

    fireEvent.click(transferButton);
    expect(WalletStore.transferWallet).toHaveBeenCalledWith(mockWallet, mockWallet1, '');
  });
});
