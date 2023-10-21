import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mockParsedCategories, mockUserCurrency, mockWallets } from '../../../../setupTests';
import CategoryCalculatorModal from '../CategoryCalculatorModal';

jest.mock('../../../store');
jest.mock('../../modal/modal');

jest.mock('../../calculator/calculator', () => () => <div>Calculator Component Mock</div>);
jest.mock('../../calculator/CalculatorWalletModal', () => () => <div>CalculatorWalletModal Component Mock</div>);

const selectedCategory = mockParsedCategories[0];
const selectedWallet = mockWallets[0];
const setCalculatorModal = jest.fn();

describe('CategoryCalculatorModal.js', () => {
  beforeEach(async () => {
    await act(() => {
      render(
        <CategoryCalculatorModal
          selectedCategory={selectedCategory}
          calculatorModal
          setCalculatorModal={setCalculatorModal}
        />
      );
    });
  });

  it('renders the component with default props', () => {
    expect(screen.getByText('From wallet')).toBeInTheDocument();
    expect(screen.getByText(selectedWallet.name)).toBeInTheDocument();
    expect(screen.getByText(`${selectedWallet.balance.toFixed(2)} ${mockUserCurrency.symbol}`)).toBeInTheDocument();
    expect(screen.getByText('To category')).toBeInTheDocument();
    expect(screen.getByText(selectedCategory.name)).toBeInTheDocument();
    expect(screen.getByText('Expense')).toBeInTheDocument();
  });

  it('handles wallet click and shows CalculatorWalletModal', async () => {
    const walletButton = screen.getByText('From wallet');

    await act(() => {
      userEvent.click(walletButton);
    });

    expect(screen.getByText('CalculatorWalletModal Component Mock')).toBeInTheDocument();
  });
});
