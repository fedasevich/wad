import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mockParsedCategories } from '../../../../../setupTests';
import { ANALYTICS_CATEGORIES_TO_SHOW, AnalyticsPercentage } from '../AnalyticsPercentage';

jest.mock('../../../../ui/Icons/CategoryIcons/CategoryIcons');

jest.mock('../../../../store', () => ({
  useStore: () => ({ category: { parsedCategories: mockParsedCategories } })
}));

describe('AnalyticsPercentage.js', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<AnalyticsPercentage />);
    });
  });

  it('renders category items', () => {
    expect(screen.getAllByTestId('percentage-item')).toHaveLength(ANALYTICS_CATEGORIES_TO_SHOW + 1);
  });

  it('renders additional category items when show more is clicked', () => {
    const showMoreButton = screen.getByRole('button', {
      name: /show more/i
    });

    fireEvent.click(showMoreButton);

    expect(screen.getAllByTestId('percentage-item')).toHaveLength(
      mockParsedCategories.filter((item) => item.spent > 0).length
    );
  });
});
