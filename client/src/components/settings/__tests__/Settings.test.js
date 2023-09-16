import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Settings } from '../Settings';

jest.mock('../../../store');

describe('Settings.js', () => {
  it('renders without errors', () => {
    const { container } = render(<Settings />);
    expect(container).toMatchSnapshot();
  });
});
