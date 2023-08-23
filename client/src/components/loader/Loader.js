import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { LoaderIcon } from '../../ui/Icons/ControlIcons/ControlIcons';
import './style.css';

const Loader = React.memo(function loader({ isFullHeight }) {
  return (
    <Row className={`${isFullHeight ? 'vh-100' : ''} loader_container`}>
      <Col md={12} className="loader justify-content-center">
        <LoaderIcon />
      </Col>
    </Row>
  );
});

export default Loader;
