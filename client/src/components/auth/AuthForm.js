import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login, registration } from '../../http/userApi';
import { useStore } from '../../store';

export function AuthForm({ isLogin }) {
  const { user, userSettings, rootStore } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSuccessfulAuth = async (data) => {
    user.setUser(data);
    user.setIsAuth(true);
    await rootStore.initializeCategoriesAndWallets();
    navigate(userSettings.startPage);
  };

  const handleAuthError = (error) => {
    toast.error(error.response.data.message);
  };

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      await handleSuccessfulAuth(data);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleRegistration = async () => {
    try {
      const data = await registration(email, password);
      await handleSuccessfulAuth(data);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      return handleLogin();
    }
    return handleRegistration();
  };

  return (
    <Form onSubmit={(event) => handleSubmit(event)} className="auth-form">
      <Form.Label className="mb-0" htmlFor="email">
        E-mail
      </Form.Label>
      <Form.Control
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        id="email"
        name="email"
        autoFocus
        placeholder="Enter your e-mail"
        className="mt-1 mb-2"
      />
      <Form.Label className="mb-0" htmlFor="password">
        Password
      </Form.Label>
      <Form.Control
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        className="mt-1"
      />
      <Button className="bg-light-blue border-0 mt-3 w-100" type="submit">
        {isLogin ? 'Login' : 'Register'}
      </Button>
    </Form>
  );
}
