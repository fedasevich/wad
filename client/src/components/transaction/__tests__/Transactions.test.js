import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mockTransactions } from '../../../../setupTests';
import Transactions from '../Transactions';

jest.mock('../../../store');
jest.mock('../ChangeTransactionModal', () => jest.fn(() => null));
jest.mock('../../modal/modal');
const mockHandleFetchTransactions = jest.fn();

describe('Transactions.js', () => {
  beforeEach(() => {
    mockHandleFetchTransactions.mockResolvedValue({ rows: mockTransactions });
  });

  it('renders the component with transactions', () => {
    render(<Transactions handleFetchTransactions={mockHandleFetchTransactions} />);

    expect(
      screen.getByRole('button', {
        name: /load more/i
      })
    ).toBeInTheDocument();
  });

  it('has nothing to load when button is clicked', async () => {
    const mockFetchTransactions = jest.fn().mockResolvedValue({ rows: [] });

    render(<Transactions handleFetchTransactions={mockFetchTransactions} />);

    const loadMoreButton = screen.getByRole('button', {
      name: /load more/i
    });

    await act(() => {
      fireEvent.click(loadMoreButton);
    });

    await waitFor(() => {
      expect(mockFetchTransactions).toHaveBeenCalledTimes(2);

      expect(loadMoreButton).not.toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: /there is nothing to load\.\.\./i
        })
      ).toBeInTheDocument();
    });
  });

  it('loads more transactions when button is clicked', async () => {
    const mockFetchTransactions = jest
      .fn()
      .mockResolvedValue({ rows: [{ ...mockTransactions[0], id: 1991, description: 'Mock Transaction' }] });

    render(<Transactions handleFetchTransactions={mockFetchTransactions} />);
    const loadMoreButton = screen.getByRole('button', {
      name: /load more/i
    });
    await act(() => {
      fireEvent.click(loadMoreButton);
    });

    expect(mockFetchTransactions).toHaveBeenCalledTimes(2);

    expect(loadMoreButton).toBeInTheDocument();
  });

  it('renders transactions according to snapshot', async () => {
    const { container } = await act(() =>
      render(<Transactions handleFetchTransactions={mockHandleFetchTransactions} />)
    );
    expect(container).toMatchSnapshot();
  });
});
