import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const PageProvider = observer(({ pageName, children }) => {
  return (
    <Col xs="12" md="9" xxl="10" className='px-0'>
      <Container fluid className='desktop-height-100vh bg-grey'>
        <main>
          {pageName &&
            <Row>
              <Col xl={{ span: 4, offset: 1 }}>
                <h1 className='mt-5 mb-5 fw-bold'>{pageName}</h1>
              </Col>
            </Row>
          }
        </main>
        <Row>
          {children}
        </Row>
      </Container>
    </Col>
  )
})

export default PageProvider