import { mockTransactions } from '../../../../../../../setupTests';
import { processChartData } from '../processChartData';

jest.mock('../../../../../../store');

const expectedResult = {
  labels: ['20.8 - 26.8', '13.8 - 19.8', '6.8 - 12.8'],

  datasets: [
    {
      label: 'Leisure',
      data: [1, 0, 0],
      backgroundColor: '#FFFFFF'
    },
    {
      label: 'Family',
      data: [21, 0, 0],
      backgroundColor: '#FFFFFF'
    },
    {
      label: 'Groceries',
      data: [0, 15, 0],
      backgroundColor: '#FFFFFF'
    },
    {
      label: 'Gifts',
      data: [0, 3, 0],
      backgroundColor: '#FFFFFF'
    },
    {
      label: 'фыв',
      data: [0, 0, 20],
      backgroundColor: '#FFFFFF'
    }
  ]
};

const chartRange = 'week';

jest.mock('../../../../../../ui/Icons/CategoryIcons/CategoryIcons');

describe('processChartData.js', () => {
  it('processes chart data correctly for single transaction', () => {
    const data = [mockTransactions[0]];
    const expectedResult = {
      labels: ['20.8 - 26.8'],
      datasets: [
        {
          label: mockTransactions[0].description,
          data: [Number(mockTransactions[0].sum)],
          backgroundColor: '#FFFFFF'
        }
      ]
    };

    const result = processChartData(data, chartRange);

    expect(result).toStrictEqual(expectedResult);
  });

  it('processes chart data correctly for multiple transactions', () => {
    const result = processChartData(mockTransactions, chartRange);

    expect(result).toStrictEqual(expectedResult);
  });
});
