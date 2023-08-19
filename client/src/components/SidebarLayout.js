import React, { Suspense } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Loader from './loader/Loader';

export function SidebarLayout() {
  return (
    <Container fluid className="vh-100">
      <Row className="flex-column-reverse flex-md-row min-vh-100">
        <Col xs="12" md="3" xxl="2" className="px-0">
          <NavBar />
        </Col>
        <Suspense
          fallback={
            <Col xs="12" md="9" xxl="10" className="px-0">
              <Loader />
            </Col>
          }
        >
          <Outlet />
        </Suspense>
      </Row>
    </Container>
  );
}
