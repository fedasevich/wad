import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockTransactions } from '../../../../../setupTests';
import { AnalyticsStatistics } from '../AnalyticsStatistics';

const expectedResult = {
  dailyAverage: 8.57,
  weeklyAverage: 20.0,
  monthlyAverage: 60.0,
  total: 60
};

describe('AnalyticsStatistics.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('processes category statistics correctly', () => {
    render(<AnalyticsStatistics transactions={mockTransactions.filter((transaction) => transaction.sum < 0)} />);

    expect(
      screen.getByRole('heading', {
        name: /statistics/i
      })
    ).toBeInTheDocument();

    expect(screen.getByText(new RegExp(`Daily Average: ${expectedResult.dailyAverage}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Weekly Average: ${expectedResult.weeklyAverage}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Monthly Average: ${expectedResult.monthlyAverage}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Total: ${expectedResult.total}`, 'i'))).toBeInTheDocument();
  });
});
