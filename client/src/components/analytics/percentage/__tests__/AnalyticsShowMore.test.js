import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '../../../../../setupTests';
import { AnalyticsShowMore } from '../AnalyticsShowMore';

jest.mock('../../../../ui/Icons/CategoryIcons/CategoryIcons');

describe('AnalyticsShowMore.js', () => {
  it('renders with default props', () => {
    const { container } = render(<AnalyticsShowMore spent={10} />);
    expect(container).toBeInTheDocument();
    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });
});
