import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import TransactionsColumn from '../TransactionsColumn';

jest.mock('../../../store');
jest.mock('../ChangeTransactionModal', () => jest.fn(() => null));
jest.mock('../../modal/modal');

describe('TransactionsColumn.js', () => {
  it('renders without errors', () => {
    render(<TransactionsColumn />);
    const headerElement = screen.getByText(/Recent activity/i);
    expect(headerElement).toBeInTheDocument();
  });
});
