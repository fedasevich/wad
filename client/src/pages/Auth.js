import React, { useState } from 'react'

import {Button, Card, Container, Form, Row} from "react-bootstrap"
import { NavLink, useLocation } from 'react-router-dom';
import { login, registration } from '../http/userApi';
import { LOGIN_ROUTE, REGESTRATION_ROUTE } from '../utils/consts';
const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] =  useState('')
const submit = async () => {
if(isLogin) {
const response = await login()
} else {
  const response = await registration(email,password);
  console.log(response)
}


}

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
    <Card style={{width:600}} className="p-5">
      <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
      <Form className="d-flex flex-column">
        <Form.Control 
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        name="email"
        placeholder="Enter your email..." className="mt-2"
        />
        <Form.Control 
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        name="password"
        placeholder="Enter your password..." className="mt-2"
        />
        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
          {isLogin ?
          
          <h4>Don't have account? <NavLink to={REGESTRATION_ROUTE}>Create account</NavLink></h4>
          
          :
          <h4>Have account? <NavLink to={LOGIN_ROUTE}>Login </NavLink></h4>
        }

        <Button className="align-self-end" onClick={submit}variant={"outline-success"}>
          {isLogin ? 'Login':'Register'}
        </Button>
        </Row>
      </Form>
    </Card>
      </Row>
    </Container>
  );
};

export default Auth