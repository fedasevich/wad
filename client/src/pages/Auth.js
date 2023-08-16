import React, { useState } from 'react';

import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userApi';
import { useStore } from '../store';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/constants';

function Auth() {
  const { user, userSettings } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }

      user.setUser(data);
      user.setIsAuth(true);
      navigate(userSettings.startPage);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Card className="p-5 col-md-12">
          <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
          <Form className="d-flex flex-column" onSubmit={(event) => submit(event)}>
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
