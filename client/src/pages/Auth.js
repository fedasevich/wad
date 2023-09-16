import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { AuthFormContainer } from '../components/auth/AuthFormContainer';
import { AuthLogo } from '../components/auth/AuthLogo';

function Auth() {
  return (
    <Container fluid className="auth-container vh-100">
      <Row className="h-100">
        <Col
          xl={7}
          lg={6}
          md={5}
          className="d-flex flex-column justify-content-center align-items-center d-none d-md-flex"
        >
          <AuthLogo />
        </Col>
        <Col
          xl={5}
          md={{ offset: 0, span: 7 }}
          lg={{ offset: 0, span: 6 }}
          className="d-flex flex-column justify-content-center align-items-center px-0"
        >
          <AuthFormContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default Auth;
