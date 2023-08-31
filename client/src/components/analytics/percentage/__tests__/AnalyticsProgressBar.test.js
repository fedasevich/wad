import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { AnalyticsProgressBar } from '../AnalyticsProgressBar';

jest.mock('../../../../ui/Icons/CategoryIcons/CategoryIcons');

describe('AnalyticsProgressBar.js', () => {
  it('renders with default props', () => {
    const { container } = render(<AnalyticsProgressBar />);
    expect(container).toBeInTheDocument();
  });

  it('renders with specified props', () => {
    render(<AnalyticsProgressBar className="custom-class" max={200} value={50} iconId={1} />);

    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle('width: 50%');
    expect(progressBar).toHaveStyle('background-color: #FFFFFF');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-label', 'progressBar');
    expect(progressBar).toHaveAttribute('aria-valuemax', '200');
  });
});
