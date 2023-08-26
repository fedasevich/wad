import React, { useState } from 'react';

import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userApi';
import { useStore } from '../store';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/constants';

function Auth() {
  const { user, userSettings, rootStore } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSuccessfulAuth = async (data) => {
    await rootStore.initializeCategoriesAndWallets();
    user.setUser(data);
    user.setIsAuth(true);
    navigate(userSettings.startPage);
  };

  const handleAuthError = (error) => {
    console.error(error);
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
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Card className="p-5 col-md-12">
          <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
          <Form className="d-flex flex-column" onSubmit={(event) => handleSubmit(event)}>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              autoFocus
              placeholder="Enter your email..."
              className="mt-2"
            />
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter your password..."
              className="mt-2"
            />
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
              {isLogin ? (
                <h4>
                  Don&apos;t have account? <NavLink to={REGISTRATION_ROUTE}>Create account</NavLink>
                </h4>
              ) : (
                <h4>
                  Have account? <NavLink to={LOGIN_ROUTE}>Login </NavLink>
                </h4>
              )}

              <Button className="align-self-end" type="submit" variant="outline-success">
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </Row>
          </Form>
        </Card>
      </Row>
    </Container>
  );
}

export default Auth;
