import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  CardHeader,
  CardBody,
  ListGroupItem,
} from 'react-bootstrap';
import Timeline, { TimelineItem } from '../components/Timeline';
import { Metadata } from 'next';
import SummarySection from '../components/SummarySection';

export const metadata: Metadata = {
  title: 'About Me',
};

export default function Page() {
  return (
    <Container className="mt-5">
      <SummarySection
        title="About Me"
        summary="I'm Kristian Matthews-Kennington, a BSc-educated software
            developer with six years of experience. I specialize in web design
            and full-stack development, with a strong focus on creating
            impactful digital experiences."
      />
      <Row className="mb-5">
        <Col md={6}>
          <Card>
            <CardHeader className="bg-primary">Core Competencies</CardHeader>
            <CardBody>
              <ListGroup variant="flush">
                <ListGroupItem>Customer Service</ListGroupItem>
                <ListGroupItem>Team Player</ListGroupItem>
                <ListGroupItem>Technological Skills</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <h2>Professional Experience</h2>
          <Timeline>
            <TimelineItem
              title="Meter Data Administrator at Engie"
              content="Managed the meter data for a electricity and gas utilities."
            />
            <TimelineItem
              title="Co-Owner at M-K Enterprises"
              content="Actively engaged with customers and suppliers to ensure exceptional service."
            />
            <TimelineItem
              title="Director at Cozy Glow"
              content="Designed the brand and developed the original e-commerce website."
            />
          </Timeline>
        </Col>
      </Row>
    </Container>
  );
}
