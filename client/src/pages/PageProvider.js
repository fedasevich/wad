import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Header = observer(({ pageName, children }) =>
  <header>
    <Row>
      <Col xs={{ span: 4, }} sm={{ offset: 1 }}>
        <h1 className='mt-5 mb-5 fw-bold'>{pageName}</h1>
      </Col>
      {children}
    </Row>
  </header>)

const PageProvider = observer(({ pageName, children }) => {
  return (
    <Col xs="12" md="9" xxl="10" className='px-0'>
      <Container fluid className='desktop-height-100vh bg-grey'>
        {pageName && <Header pageName={pageName} />}
        <main>
          <Row>
            {children}
          </Row>
        </main>
      </Container>
    </Col>
  )
})

PageProvider.Header = Header

export default PageProvider