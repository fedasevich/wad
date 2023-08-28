import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import SettingsPage from '../SettingsPage';

jest.mock('../../components/settings/Settings', () => {
  return {
    Settings: () => <div>Mocked Settings Component</div>
  };
});

describe('SettingsPage.js', () => {
  beforeEach(() => render(<SettingsPage />));

  it('renders page name', () => {
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
