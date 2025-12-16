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
        summary="I am a BSc-educated software developer with experience, specialising in web design and full-stack development.
            I am passionate about creating impactful digital experiences."
      />
      <Row className="mb-5">
        <Col md={6}>
          <Card>
            <CardHeader className="bg-primary">Core Competencies</CardHeader>
            <CardBody>
              <ListGroup variant="flush">
                <ListGroupItem>Digital Transformation</ListGroupItem>
                <ListGroupItem>
                  Process Improvement & Operational Excellence
                </ListGroupItem>
                <ListGroupItem>
                  Data Analysis & Insight Generation
                </ListGroupItem>
                <ListGroupItem>Full-Stack Web Development</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <h2>Professional Experience</h2>
          <Timeline>
            <TimelineItem
              title="Market Operations Improvement Analyst at Engie"
              content="Cross-team process improvement and data quality initiatives across Market Operations, using analysis and stakeholder collaboration to reduce rework and improve operational outcomes."
            />
            <TimelineItem
              title="Meter Data Administrator at Engie"
              content="Process improvement and collaboration across teams to boost operational efficiency and meter data accuracy."
            />
            <TimelineItem
              title="Co-Owner at M-K Enterprises"
              content="Actively manage supplier relationships, and engage with customers to ensure exceptional service, brand development, and financial oversight to optimise business operations."
            />
            <TimelineItem
              title="Director at Cozy Glow"
              content="Designed the brand strategy and developed the original e-commerce website. Directed e-commerce growth, and financial operations to drive consistent sales growth and market presence."
            />
            <TimelineItem
              title="Software Developer at Bark.com"
              content="Enhanced platform functionality and user interfaces to improve overall experience."
            />
            <TimelineItem
              title="Junior Software Developer at Intuitive Systems"
              content="Assisted in full-stack development and integrated third-party services to support platform scalability."
            />
          </Timeline>
        </Col>
      </Row>
    </Container>
  );
}
