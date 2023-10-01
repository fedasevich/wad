import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { act } from 'react-dom/test-utils';
import { awaitAllLoaders, mockCategories, mockUserCurrency } from '../../../setupTests';
import Category from '../Category';

jest.mock('../../components/transaction/TransactionsColumn', () => () => <div>Recent activity</div>);
jest.mock('../../components/category/CategoriesChart', () => () => <div>Chart Category Component Mock</div>);
jest.mock('../../components/category/EditCategory', () => () => <div>Edit Category Component Mock</div>);
jest.mock('../../components//category/CreateCategory', () => () => <div>Create Category Component Mock</div>);

jest.mock('../../store', () => ({
  useStore: () => ({
    category: {
      parsedCategories: [mockCategories[0]],
      parseCategories: jest.fn()
    },
    currency: {
      userCurrency: mockUserCurrency
    }
  })
}));

describe('Category.js', () => {
  beforeEach(async () => {
    await act(() => {
      render(<Category />);
    });
  });

  it('renders the default page title', async () => {
    await awaitAllLoaders(() => {
      expect(screen.getByText(/Categories/i)).toBeInTheDocument();
    });
  });

  describe('Category page state', () => {
    it('switches active page state to Edit Category', async () => {
      await awaitAllLoaders(() => undefined);

      const settingsIcon = screen.getByTestId(`category-settings-${mockCategories[0].id}`);
      await act(() => {
        fireEvent.click(settingsIcon);
      });

      expect(screen.getByText(/edit category component mock/i)).toBeInTheDocument();
    });

    it('switches active page state to Create Category', async () => {
      await awaitAllLoaders(() => undefined);

      const settingsIcon = screen.getByTestId('category-create-icon');
      await act(() => {
        fireEvent.click(settingsIcon);
      });

      expect(screen.getByText(/create category component mock/i)).toBeInTheDocument();
    });
  });
});
