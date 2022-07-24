import React, { useContext, useState } from 'react'

import {Button, Card, Container, Form, Row} from "react-bootstrap"
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userApi';
import { Context } from '../index';
import { LOGIN_ROUTE, MAIN_ROUTE, REGESTRATION_ROUTE } from '../utils/consts';
const Auth = () => {
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] =  useState('')

const submit = async () => {
  try {
    let data;
    if(isLogin) {
    data = await login(email,password)
    console.log(data);
    } else {
      data = await registration(email,password);
    }
    
user.setUser(user)
user.setIsAuth(true)
console.log(user.isAuth)
navigate(MAIN_ROUTE)
  } catch(e) {
   alert(e.response.data.message);
  }



}

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
    <Card  className="p-5 col-md-12">
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