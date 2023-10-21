import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockCategories } from '../../../../setupTests';
import CalculatorCategoryModal from '../CalculatorCategoryModal'; // Replace with the correct import path

jest.mock('../../../store');
jest.mock('../../modal/modal');

describe('CalculatorCategoryModal.js', () => {
  it('renders the modal when active is true', () => {
    render(
      <CalculatorCategoryModal categoryModalActive setCategoryModalActive={jest.fn()} setSelectedCategory={jest.fn()} />
    );

    expect(screen.getByText('Choose category')).toBeInTheDocument();

    mockCategories.forEach((category) => expect(screen.getByText(category.name)).toBeInTheDocument());
  });

  it('calls setSelectedCategory when a category is selected', () => {
    const setSelectedCategoryMock = jest.fn();
    const mockCategory = mockCategories[0];

    render(
      <CalculatorCategoryModal
        categoryModalActive
        setCategoryModalActive={jest.fn()}
        setSelectedCategory={setSelectedCategoryMock}
      />
    );

    const categoryButton = screen.getByText(mockCategory.name);
    fireEvent.click(categoryButton);

    expect(setSelectedCategoryMock).toHaveBeenCalledWith(mockCategory);
  });
});
