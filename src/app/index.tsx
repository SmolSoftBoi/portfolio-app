import { Block, PullQuote } from '@smolpack/react-bootstrap-extensions';
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  ListGroup,
  Row,
} from 'react-bootstrap';

export default function Page() {
  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1>Welcome to My Portfolio</h1>
          <p>
            Hi, I&apos;m Kristian Matthews-Kennington, an ambitious software
            developer specialized in web design and full-stack development.
            I&apos;m passionate about creating impactful digital experiences.
          </p>
          <Button variant="primary" href="/about">
            Learn More About Me
          </Button>
        </Col>
      </Row>
      <Row className="mb-5 align-items-stretch">
        <Col md={6}>
          <Card>
            <Card.Header className="bg-primary">Key Skills</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>HTML, CSS, JavaScript</ListGroup.Item>
                <ListGroup.Item>Agile Workflow</ListGroup.Item>
                <ListGroup.Item>Customer Service</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header className="bg-primary">Featured Projects</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>E-commerce Websites</ListGroup.Item>
                <ListGroup.Item>Full-stack Projects</ListGroup.Item>
              </ListGroup>
              <Button variant="primary" href="/portfolio" className="mt-3">
                View Portfolio
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Row className="mb-5">
        <Col>
          <h2>Testimonials</h2>
          <Carousel variant="light" slide wrap touch>
            <Carousel.Item>
              <Block>
                <PullQuote>
                  <p>"Kristian is a highly skilled developer."</p>
                  <cite>Client A</cite>
                </PullQuote>
              </Block>
            </Carousel.Item>
            <Carousel.Item>
              <Block>
                <PullQuote>
                  <p>"Exceptional work ethic and attention to detail."</p>
                  <cite>Client B</cite>
                </PullQuote>
              </Block>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row> */}
    </Container>
  );
}
