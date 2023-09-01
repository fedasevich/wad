import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import TransactionsWallet from '../TransactionsWallet';

jest.mock('../../../store');
jest.mock('../ChangeTransactionModal', () => jest.fn(() => null));
jest.mock('../../modal/modal');

describe('TransactionsWallet.js', () => {
  it('renders without errors', () => {
    const { container } = render(<TransactionsWallet />);
    expect(container).toBeInTheDocument();
  });
});
