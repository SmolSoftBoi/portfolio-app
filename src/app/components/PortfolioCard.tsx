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
          {props.project.techStack.map((tech, index) => (
            <OverlayTrigger
              key={index}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${index}`}>
                  {techDescriptions[tech]}
                </Tooltip>
              }
            >
              <Badge bg="light" text="dark" className="me-1" pill>
                {tech}
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
