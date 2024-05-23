import { Col, Container, Row } from 'react-bootstrap';

export default function NotFound() {
  return (
    <Container as="section" className="mt-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </Col>
      </Row>
    </Container>
  );
}
