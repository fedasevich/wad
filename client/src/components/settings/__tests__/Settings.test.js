import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Settings } from '../Settings';

describe('Settings.js', () => {
  it('renders without errors', () => {
    const { container } = render(<Settings />);
    expect(container).toMatchSnapshot();
  });
});
