import {
  Container,
  Row,
  Col,
  ListGroup,
  Accordion,
  Button,
  ListGroupItem,
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
            <ListGroupItem>
              Customer Service: Generated £4k in monthly company revenue.
            </ListGroupItem>
            <ListGroupItem>
              Team Player: 100% order fulfillment during busy festive periods.
            </ListGroupItem>
            <ListGroupItem>
              Technological Skills: Proficient in HTML, CSS, JavaScript, and
              more.
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={6}>
          <h2>Technological Skills</h2>
          <ListGroup>
            <ListGroupItem>Web Design and Full-stack Development</ListGroupItem>
            <ListGroupItem>User Experience and Interface Design</ListGroupItem>
            <ListGroupItem>Agile Workflow</ListGroupItem>
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
