import '@testing-library/jest-dom';
import React from 'react';

import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { mockTransactions } from '../../../setupTests';
import CategoryStore from '../../store/CategoryStore';
import AnalyticsPage from '../AnalyticsPage';

jest.mock('../../components/analytics/chart/AnalyticsChart', () => ({
  __esModule: true,
  AnalyticsChart: () => <div>Chart Analytics Component Mock</div>
}));

jest.mock('../../components/analytics/percentage/AnalyticsPercentage', () => ({
  __esModule: true,
  AnalyticsPercentage: () => <div>Percentage Analytics Component Mock</div>
}));

jest.mock('../../components/analytics/statistics/AnalyticsStatistics', () => ({
  __esModule: true,
  AnalyticsStatistics: () => <div>Statistics Analytics Component Mock</div>
}));

jest.mock('../../store');

jest.mock('../../store/CategoryStore.js', () => ({
  fetchCategoryPeriod: jest.fn()
}));

describe('AnalyticsPage.js', () => {
  beforeEach(async () => {
    CategoryStore.fetchCategoryPeriod.mockResolvedValue({ rows: mockTransactions });
    await act(async () => {
      render(<AnalyticsPage />);
    });
  });

  it('renders the default page', async () => {
    expect(
      screen.getByRole('heading', {
        name: /analytics/i
      })
    ).toBeInTheDocument();
  });

  it('renders the graph', async () => {
    expect(screen.getByText(/chart analytics component mock/i)).toBeInTheDocument();
  });

  it('renders the percentage', async () => {
    expect(screen.getByText(/percentage analytics component mock/i)).toBeInTheDocument();
  });

  it('renders the statistics', async () => {
    expect(screen.getByText(/statistics analytics component mock/i)).toBeInTheDocument();
  });
});
describe('renders no statistics message', () => {
  beforeEach(async () => {
    CategoryStore.fetchCategoryPeriod.mockResolvedValue({ rows: [] });
    await act(async () => {
      render(<AnalyticsPage />);
    });
  });

  it('renders the graph', async () => {
    expect(screen.getByText(/chart analytics component mock/i)).toBeInTheDocument();
  });

  it('renders the no statistics message', async () => {
    expect(screen.getAllByText(/there is no statistics/i)).toHaveLength(2);
  });
});
