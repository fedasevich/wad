import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockTransactions } from '../../../../../setupTests';
import { AnalyticsChart } from '../AnalyticsChart';

jest.mock('../../../../store');

const transactions = mockTransactions;
const chartRange = 'week';
const mockProcessedData = { labels: [], datasets: [] };

jest.mock('../libs/helpers/processChartData', () => ({
  processChartData: () => mockProcessedData
}));

jest.mock('react-chartjs-2', () => ({
  Bar: () => <canvas />
}));

describe('AnalyticsChart.js', () => {
  beforeEach(() => {
    render(<AnalyticsChart transactions={transactions} chartRange={chartRange} />);
  });

  it('expands and collapses the chart', () => {
    const expandButton = screen.getByTestId('expand-button');
    fireEvent.click(expandButton);

    const chartContainer = screen.getByTestId('analytics-chart');
    expect(chartContainer).toHaveClass('expanded');

    fireEvent.click(expandButton);
    expect(chartContainer).not.toHaveClass('expanded');
  });

  it('renders the chart', () => {
    expect(document.querySelector('canvas')).toBeInTheDocument();
  });
});
