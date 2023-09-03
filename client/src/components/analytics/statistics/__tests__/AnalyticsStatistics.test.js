import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockTransactions } from '../../../../../setupTests';
import { AnalyticsStatistics } from '../AnalyticsStatistics';

const expectedResult = {
  dailyAverage: 10,
  weeklyAverage: 20.0,
  monthlyAverage: 60.0
};

describe('AnalyticsStatistics.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('processes category statistics correctly', () => {
    render(<AnalyticsStatistics transactions={mockTransactions} />);

    expect(
      screen.getByRole('heading', {
        name: /statistics/i
      })
    ).toBeInTheDocument();

    expect(screen.getByText(new RegExp(`Daily Average: ${expectedResult.dailyAverage}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Weekly Average: ${expectedResult.weeklyAverage}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Monthly Average: ${expectedResult.monthlyAverage}`, 'i'))).toBeInTheDocument();
  });
});
