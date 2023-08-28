import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import PageProvider from '../PageProvider';

describe('PageProvider.js', () => {
  it('renders without crashing', () => {
    render(<PageProvider />);
  });

  it('renders header with pageName prop', () => {
    render(<PageProvider pageName="Test Page" />);
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <PageProvider>
        <div>Child Content</div>
      </PageProvider>
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders header and children content', () => {
    render(
      <PageProvider pageName="Test Page">
        <div>Child Content</div>
      </PageProvider>
    );
    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders children without pageName', () => {
    render(
      <PageProvider>
        <div>Child Content</div>
      </PageProvider>
    );
    expect(screen.queryByText('Test Page')).toBeNull();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<PageProvider.Header />);
  });

  it('renders with pageName prop', () => {
    render(<PageProvider.Header pageName="Test Page" />);
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });
});
