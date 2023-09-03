import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { AnalyticsSelect, analyticsDateRangeOptions } from '../AnalyticsSelect';

jest.mock('../../ArrowSelect', () => {
  return ({ handleArrowLeftClick, handleArrowRightClick, textToPrint }) => {
    return (
      <div>
        <button type="button" data-testid="left-arrow" onClick={handleArrowLeftClick}>
          left
        </button>
        <button type="button" data-testid="right-arrow" onClick={handleArrowRightClick}>
          right
        </button>
        <div data-testid="text-to-print">{textToPrint}</div>
      </div>
    );
  };
});

const setChartRange = jest.fn();

function updateChartRangeOnClick(direction, expectedRange) {
  render(<AnalyticsSelect chartRange="" setChartRange={setChartRange} />);

  fireEvent.click(screen.getByTestId(`${direction}-arrow`));
  expect(setChartRange).toHaveBeenCalledWith(analyticsDateRangeOptions[0]);

  expect(setChartRange).toHaveBeenCalledWith(expectedRange);
}

function loopChartRange(dateRangeOptions, direction) {
  render(<AnalyticsSelect chartRange="" setChartRange={setChartRange} />);
  dateRangeOptions.forEach((dateRangeOption) => {
    fireEvent.click(screen.getByTestId(`${direction}-arrow`));
    expect(setChartRange).toHaveBeenCalledWith(dateRangeOption);
  });
}

describe('AnalyticsSelect.js', () => {
  it('updates chart range when left arrow is clicked', () => {
    updateChartRangeOnClick('left', analyticsDateRangeOptions[analyticsDateRangeOptions.length - 1]);
  });

  it('updates chart range when right arrow is clicked', () => {
    updateChartRangeOnClick('right', analyticsDateRangeOptions[1]);
  });

  it('loops chart range when left arrow is clicked', async () => {
    loopChartRange(analyticsDateRangeOptions.slice(1).reverse(), 'left');
  });

  it('loops chart range when right arrow is clicked', () => {
    loopChartRange(analyticsDateRangeOptions, 'right');
  });
});
