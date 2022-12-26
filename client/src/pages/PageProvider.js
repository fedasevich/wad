import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavBar from '../components/NavBar'

const PageProvider = observer(({pageName,children}) => {
  return (
 <>
     <Container fluid className='vh-100 ps-0 '>
      <Row className='flex-column-reverse flex-md-row'>
        <Col xs="12" md="3" xxl="2" className='pe-0'>
        <NavBar/>
        </Col>
 
    <Col xs="12"  md="9" xxl="10">
    <Container fluid>
      <h1 className='mt-5 mb-5 fw-bold'>{pageName}</h1>
      <Row>
      {children}
      </Row>
    </Container>
    </Col>
     </Row>
    </Container>
 </>
  )
})

export default PageProvider