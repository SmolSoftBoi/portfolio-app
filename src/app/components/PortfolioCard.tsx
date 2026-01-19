import { useMemo } from 'react';
import Image from 'next/image';
import {
  Badge,
  Button,
  Card,
  CardBody,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Project } from '../portfolio/page';

interface PortfolioCardProps {
  project: Project;
}

export default function PortfolioCard(props: PortfolioCardProps) {
  interface TechDescriptions {
    [key: string]: string;
  }

  const techDescriptions: TechDescriptions = {
    Shopify: 'E-commerce platform for online stores',
    JavaScript: 'Programming language for web development',
    HTML: 'Markup language for creating web pages',
    CSS: 'Stylesheet language for designing web layouts',
    PHP: 'Server-side scripting language for web development',
    'Node.js': 'JavaScript runtime environment for web development',
    TypeScript: 'Programming language for building web applications',
  };

  const safeTitleId = props.project.title
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .toLowerCase();

  const sanitizedTechStack = useMemo(() => {
    return props.project.techStack.map((tech) => ({
      original: tech,
      safeId: tech.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase(),
    }));
  }, [props.project.techStack]);

  return (
    <Card className="profile-variant h-100">
      <CardBody className="d-flex flex-column">
        {props.project.profileImage ? (
          <Image
            src={props.project.profileImage}
            alt={props.project.title}
            className="card-profile-img"
          />
        ) : null}
        <Card.Title className="text-center">{props.project.title}</Card.Title>
        <Card.Text>{props.project.description}</Card.Text>
        <Card.Subtitle>Tech Stack</Card.Subtitle>
        <Card.Text>
          {sanitizedTechStack.map(({ original, safeId }) => (
            <OverlayTrigger
              key={original}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${safeTitleId}-${safeId}`}>
                  {techDescriptions[original]}
                </Tooltip>
              }
            >
              <Badge bg="light" text="dark" className="me-1" pill>
                {original}
              </Badge>
            </OverlayTrigger>
          ))}
        </Card.Text>
        <div className="mt-auto">
          <Button
            className="mt-auto"
            variant="primary"
            href={props.project.link}
            target="_blank"
          >
            Read More
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
