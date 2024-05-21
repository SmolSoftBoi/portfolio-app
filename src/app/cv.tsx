import {
  Container,
  Row,
  Col,
  ListGroup,
  Accordion,
  Button,
} from 'react-bootstrap';

export default function Cv() {
  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1>Kristian Matthews-Kennington</h1>
          <p>
            kristian@matthews-kennington.com | +44 7563 215490 | Oakenshaw,
            United Kingdom
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={6}>
          <h2>Core Competencies and Achievements</h2>
          <ListGroup>
            <ListGroup.Item>
              Customer Service: Generated £4k in monthly company revenue.
            </ListGroup.Item>
            <ListGroup.Item>
              Team Player: 100% order fulfillment during busy festive periods.
            </ListGroup.Item>
            <ListGroup.Item>
              Technological Skills: Proficient in HTML, CSS, JavaScript, and
              more.
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          <h2>Technological Skills</h2>
          <ListGroup>
            <ListGroup.Item>
              Web Design and Full-stack Development
            </ListGroup.Item>
            <ListGroup.Item>
              User Experience and Interface Design
            </ListGroup.Item>
            <ListGroup.Item>Agile Workflow</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <h2>Professional Experience</h2>
          <Accordion defaultActiveKey="cozy-glow">
            <Accordion.Item eventKey="cozy-glow">
              <Accordion.Header>Director at Cozy Glow</Accordion.Header>
              <Accordion.Body>
                {/* Add your experience details here */}
                Managed a team of 5, increased revenue by 20%, etc.
              </Accordion.Body>
            </Accordion.Item>
            {/* Add more for other experiences */}
          </Accordion>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <h2>Education</h2>
          <p>
            BSc (Hons) Multimedia Computing and Animation | University of
            Westminster
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <h2>Projects</h2>
          {/* Add your projects here */}
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <h2>Certifications</h2>
          {/* Add your certifications here */}
        </Col>
      </Row>
    </Container>
  );
}
