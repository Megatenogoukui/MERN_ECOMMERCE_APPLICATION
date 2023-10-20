import React from 'react'
import { Container, Row  ,Col} from 'react-bootstrap'

function Footer() {
    const currentYear = new Date().getFullYear()
  return (
    <div>
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <p>Abs Store &copy; {currentYear} </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </div>
  )
}

export default Footer