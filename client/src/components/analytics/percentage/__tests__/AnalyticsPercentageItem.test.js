import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockCategories } from '../../../../../setupTests';
import { AnalyticsPercentageItem } from '../AnalyticsPercentageItem';

jest.mock('../../../../ui/Icons/CategoryIcons/CategoryIcons');

const mockIconName = 'Test Icon';

const categoryItem = mockCategories[0];
const icon = <div>{mockIconName}</div>;
const progressBarPercentage = 50;
const onClick = jest.fn();

describe('AnalyticsPercentageItem.js', () => {
  it('renders component correctly', () => {
    render(
      <AnalyticsPercentageItem
        categoryItem={categoryItem}
        icon={icon}
        progressBarPercentage={progressBarPercentage}
        onClick={onClick}
      />
    );
    expect(screen.getByText(new RegExp(categoryItem.name), 'i')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(categoryItem.spent, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${progressBarPercentage}%`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockIconName, 'i'))).toBeInTheDocument();
  });

  it('renders correct icon', () => {
    render(
      <AnalyticsPercentageItem
        categoryItem={categoryItem}
        progressBarPercentage={progressBarPercentage}
        onClick={onClick}
      />
    );

    expect(screen.getByText('Category Icon')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    render(
      <AnalyticsPercentageItem
        categoryItem={categoryItem}
        icon={icon}
        progressBarPercentage={progressBarPercentage}
        onClick={onClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
