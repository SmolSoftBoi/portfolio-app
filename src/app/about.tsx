import Image from 'next/image';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';

import profilePic from '@/public/profile-picture.jpg';
import Timeline, { TimelineItem } from '@/app/components/Timeline';

export default function About() {
  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1>About Me</h1>
          <p>
            I&apos;m Kristian Matthews-Kennington, a BSc-educated software
            developer with six years of experience. I specialize in web design
            and full-stack development, with a strong focus on creating
            impactful digital experiences.
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={6}>
          <Card>
            <Card.Header className="bg-primary">Core Competencies</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>Customer Service</ListGroup.Item>
                <ListGroup.Item>Team Player</ListGroup.Item>
                <ListGroup.Item>Technological Skills</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h2>Professional Experience</h2>
          <Timeline>
            <TimelineItem
              title="Director at Cozy Glow"
              content="Designed the brand and developed the original e-commerce website."
            />
            <TimelineItem
              title="Co-Owner at M-K Enterprises"
              content="Actively engaged with customers and suppliers to ensure exceptional service."
            />
          </Timeline>
        </Col>
      </Row>
    </Container>
  );
}
