import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';

export default function Page() {
  return (
    <Container as="section" className="mt-5">
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
            <CardHeader className="bg-primary">Key Skills</CardHeader>
            <CardBody>
              <ListGroup variant="flush">
                <ListGroupItem>HTML, CSS, JavaScript</ListGroupItem>
                <ListGroupItem>Agile Workflow</ListGroupItem>
                <ListGroupItem>Customer Service</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardHeader className="bg-primary">Featured Projects</CardHeader>
            <CardBody>
              <ListGroup variant="flush">
                <ListGroupItem>E-commerce Websites</ListGroupItem>
                <ListGroupItem>Full-stack Projects</ListGroupItem>
              </ListGroup>
              <Button variant="primary" href="/portfolio" className="mt-3">
                View Portfolio
              </Button>
            </CardBody>
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
