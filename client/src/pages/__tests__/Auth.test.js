import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { mockAuthCredentials, mockEmail, mockPassword } from '../../../setupTests';
import { login, registration } from '../../http/userApi';
import { useStore } from '../../store';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants';
import Auth from '../Auth';

jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn()
  }
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
}));

jest.mock('../../http/userApi', () => ({
  login: jest.fn(),
  registration: jest.fn()
}));

jest.mock('../../store');

describe('Auth.js', () => {
  describe('Login', () => {
    beforeEach(() => {
      useLocation.mockReturnValue({ pathname: LOGIN_ROUTE });
      login.mockReturnValue(mockAuthCredentials);
    });

    it('renders authorization form', () => {
      render(
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      );

      const authorizationHeader = screen.getByText(/Authorization/i);
      expect(authorizationHeader).toBeInTheDocument();

      const emailInput = screen.getByPlaceholderText(/Enter your email.../i);
      expect(emailInput).toBeInTheDocument();

      const passwordInput = screen.getByPlaceholderText(/Enter your password.../i);
      expect(passwordInput).toBeInTheDocument();

      const loginButton = screen.getByText(/Login/i);
      expect(loginButton).toBeInTheDocument();

      const createAccountLink = screen.getByText(/Create account/i);
      expect(createAccountLink).toBeInTheDocument();
    });

    it('handles login submission', async () => {
      render(
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/Enter your email.../i);
      const passwordInput = screen.getByPlaceholderText(/Enter your password.../i);
      const loginButton = screen.getByText(/Login/i);

      fireEvent.change(emailInput, { target: { value: mockEmail } });
      fireEvent.change(passwordInput, { target: { value: mockPassword } });

      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(login).toHaveBeenCalledWith(mockEmail, mockPassword);
        expect(jest.isMockFunction(useStore().rootStore.initializeCategoriesAndWallets));

        expect(useStore().rootStore.initializeCategoriesAndWallets).toHaveBeenCalled();
        expect(useStore().user.setUser).toHaveBeenCalledWith(mockAuthCredentials);
        expect(useStore().user.setIsAuth).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('Register', () => {
    beforeEach(() => {
      useLocation.mockReturnValue({ pathname: REGISTRATION_ROUTE });
      registration.mockReturnValue(mockAuthCredentials);
    });

    it('renders authorization form', () => {
      render(
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      );

      const authorizationHeader = screen.getByText(/Registration/i);
      expect(authorizationHeader).toBeInTheDocument();

      const emailInput = screen.getByPlaceholderText(/Enter your email.../i);
      expect(emailInput).toBeInTheDocument();

      const passwordInput = screen.getByPlaceholderText(/Enter your password.../i);
      expect(passwordInput).toBeInTheDocument();

      const registerButton = screen.getByText(/Register/i);
      expect(registerButton).toBeInTheDocument();

      const loginAccountLink = screen.getByText(/Login/i);
      expect(loginAccountLink).toBeInTheDocument();
    });

    it('handles register submission', async () => {
      render(
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/Enter your email.../i);
      const passwordInput = screen.getByPlaceholderText(/Enter your password.../i);
      const registerButton = screen.getByText(/Register/i);

      fireEvent.change(emailInput, { target: { value: mockEmail } });
      fireEvent.change(passwordInput, { target: { value: mockPassword } });

      fireEvent.click(registerButton);

      await waitFor(() => {
        expect(registration).toHaveBeenCalledWith(mockEmail, mockPassword);
        expect(useStore().rootStore.initializeCategoriesAndWallets).toHaveBeenCalled();
        expect(useStore().user.setUser).toHaveBeenCalledWith(mockAuthCredentials);
        expect(useStore().user.setIsAuth).toHaveBeenCalledWith(true);
      });
    });
  });
});
