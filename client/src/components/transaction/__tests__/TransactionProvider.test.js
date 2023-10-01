import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockTransactions } from '../../../../setupTests';
import { useStore } from '../../../store';
import { TRANSACTION_LIMITS } from '../../../utils/constants';
import TransactionProvider from '../TransactionProvider';

jest.mock('../../../store');

describe('TransactionProvider.js', () => {
  const { category } = useStore();
  describe('Actions component', () => {
    const setButtonVisible = jest.fn();

    beforeEach(() => {
      render(<TransactionProvider.Actions setButtonVisible={setButtonVisible} category={category} />);
    });

    it('calls handleSortClick when Sort button is clicked', () => {
      const sortButton = screen.getByText(/Sort/i);
      fireEvent.click(sortButton);
      expect(category.modifyTransactionsFilter).toHaveBeenCalledWith({ sort: 'ASC', page: 1 });
      expect(setButtonVisible).toHaveBeenCalledWith(true);
    });

    it('calls handleTransactionsLimitClick with the selected limits', () => {
      TRANSACTION_LIMITS.forEach((limit) => {
        const limitButton = screen.getByText(new RegExp(`${limit}`, 'i'));
        fireEvent.click(limitButton);
        expect(category.modifyTransactionsFilter).toHaveBeenCalledWith({ limit, page: 1 });
        expect(setButtonVisible).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('LoadMore component', () => {
    it('calls fetchTransaction and setButtonVisible when Load More button is clicked', async () => {
      const fetchTransaction = jest.fn().mockResolvedValue({ rows: mockTransactions });
      const setButtonVisible = jest.fn();

      render(
        <TransactionProvider.LoadMore
          buttonVisible
          setButtonVisible={setButtonVisible}
          fetchTransaction={fetchTransaction}
        />
      );
      const loadMoreButton = screen.getByText(/Load More/i);
      fireEvent.click(loadMoreButton);
      expect(fetchTransaction).toHaveBeenCalled();
    });

    it('displays "There is nothing to load..." when buttonVisible is false', () => {
      const setButtonVisible = jest.fn();
      render(<TransactionProvider.LoadMore buttonVisible={false} setButtonVisible={setButtonVisible} />);
      const message = screen.getByText(/There is nothing to load.../i);
      expect(message).toBeInTheDocument();
    });
  });

  describe('Transaction component', () => {
    const transaction = mockTransactions[0];
    const setChangeTransactionModal = jest.fn();
    const { description, sum, id, categoryId, walletId } = transaction;
    it('should render a transaction with delete and change buttons', () => {
      render(
        <TransactionProvider.Transaction
          transaction={transaction}
          index={0}
          setChangeTransactionModal={setChangeTransactionModal}
        />
      );

      expect(screen.getByText(new RegExp(description, 'i'))).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: new RegExp(`-${sum}`, 'i') })).toBeInTheDocument();

      const deleteButton = screen.getByText('Delete');
      const changeButton = screen.getByText('Change');

      fireEvent.click(deleteButton);
      fireEvent.click(changeButton);

      expect(category.deleteTransaction).toHaveBeenCalledWith(id, walletId);
      expect(setChangeTransactionModal).toHaveBeenCalledWith({ active: true, id });
    });

    it('matches snapshot', () => {
      const { container } = render(
        <TransactionProvider.Transaction
          transaction={transaction}
          index={0}
          setChangeTransactionModal={setChangeTransactionModal}
        />
      );
      expect(container).toMatchSnapshot();
    });

    const renderAndAssertTransactionWithLineThroughStyle = (walletId, categoryId) => {
      render(<TransactionProvider.Transaction transaction={{ ...transaction, walletId, categoryId }} index={0} />);

      const transactionCard = document.querySelector('.card');
      expect(transactionCard).toHaveClass('text-decoration-line-through');
    };

    it('should render a deleted walletId transaction with a line-through style', () => {
      renderAndAssertTransactionWithLineThroughStyle(-1, categoryId);
    });

    it('should render a deleted categoryId transaction with a line-through style', () => {
      renderAndAssertTransactionWithLineThroughStyle(walletId, -1);
    });
  });

  describe('TransactionDate component', () => {
    it('renders correct date', () => {
      const date = '2023-01-09';
      render(<TransactionProvider.Transaction.Date date={date} />);
      expect(screen.getByText(new RegExp(date, 'i'))).toBeInTheDocument();
    });
  });
});
