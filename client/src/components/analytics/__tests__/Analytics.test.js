import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { mockTransactions } from '../../../../setupTests';
import CategoryStore from '../../../store/CategoryStore';
import { Analytics } from '../Analytics';

jest.mock('../../../store/CategoryStore.js', () => ({
  fetchCategoryPeriod: jest.fn()
}));

jest.mock('react-chartjs-2', () => ({
  Bar: () => <canvas />
}));

jest.mock('../../../store');

describe('Analytics.js', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2023, 7, 30));
  });

  beforeEach(async () => {
    CategoryStore.fetchCategoryPeriod.mockResolvedValue({ rows: mockTransactions });
  });

  it('matches snapshot', async () => {
    const { container } = await act(async () => {
      return render(<Analytics />);
    });
    expect(container).toMatchSnapshot();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
