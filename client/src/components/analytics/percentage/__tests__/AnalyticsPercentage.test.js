import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mockIncomeParsedCategory, mockParsedCategories, mockUserCurrency } from '../../../../../setupTests';
import { useStore } from '../../../../store';
import { ANALYTICS_CHART_TABS } from '../../Analytics';
import { ANALYTICS_CATEGORIES_TO_SHOW, AnalyticsPercentage } from '../AnalyticsPercentage';

jest.mock('../../../../ui/Icons/CategoryIcons/CategoryIcons');

jest.mock('../../../../store', () => ({
  useStore: jest.fn()
}));

describe('AnalyticsPercentage.js', () => {
  describe('Expense', () => {
    const mockUseStore = () => ({
      category: { parsedCategories: mockParsedCategories },
      currency: { userCurrency: mockUserCurrency }
    });

    beforeEach(async () => {
      useStore.mockImplementation(mockUseStore);
      await act(async () => {
        render(<AnalyticsPercentage selectedTab={ANALYTICS_CHART_TABS.EXPENSE} />);
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
  describe('Income', () => {
    it('renders income category', async () => {
      useStore.mockImplementation(() => ({
        category: { parsedCategories: [mockIncomeParsedCategory] },
        currency: { userCurrency: mockUserCurrency }
      }));

      await act(async () => {
        render(<AnalyticsPercentage selectedTab={ANALYTICS_CHART_TABS.INCOME} />);
      });

      expect(screen.getAllByTestId('percentage-item')).toHaveLength(1);
    });
  });
});
