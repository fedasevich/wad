import React, { Suspense } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export function SidebarLayout() {
  return (
    <Container fluid className="vh-100 ps-0 ">
      <Row className="flex-column-reverse flex-md-row">
        <Col xs="12" md="3" xxl="2" className="pe-0">
          <NavBar />
        </Col>
        <Suspense
          fallback={
            <Col xs="12" md="9" xxl="10" className="px-0 desktop-height-100vh">
              Loading...{' '}
            </Col>
          }
        >
          <Outlet />
        </Suspense>
      </Row>
    </Container>
  );
}
