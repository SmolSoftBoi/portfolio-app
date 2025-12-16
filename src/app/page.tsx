import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import SummarySection from './components/SummarySection';
import Link from './components/Link';

export default function Page() {
  return (
    <Container as="section" className="mt-5">
      <SummarySection
        title="Welcome to My Portfolio"
        summary="Hi, I'm Kristian Matthews-Kennington, a results-driven professional specialising in process improvement, data analysis, and full-stack development.
            I am passionate about delivering impactful, user-centered solutions that foster growth, efficiency, and innovation.
            My experience includes enhancing customer service, continuous improvement, and creating scalable web solutions.
            I thrive in environments utilising my diverse skill set to drive organisational success and technological advancement."
      >
        <Link href="/about" className="btn btn-primary">
          Learn More About Me
        </Link>
      </SummarySection>
      <Row className="mb-5 align-items-stretch">
        <Col md={6}>
          <Card>
            <CardHeader className="bg-primary">Key Skills</CardHeader>
            <CardBody>
              <ListGroup variant="flush">
                <ListGroupItem>
                  Process Improvement & Operational Efficiency
                </ListGroupItem>
                <ListGroupItem>Data Analysis & Insights</ListGroupItem>
                <ListGroupItem>Full-Stack Development</ListGroupItem>
                <ListGroupItem>Relationship Management</ListGroupItem>
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
              <Link href="/portfolio" className="btn btn-primary mt-3">
                View Portfolio
              </Link>
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
