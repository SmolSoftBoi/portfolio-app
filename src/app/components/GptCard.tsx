import { Button, Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import { Gpt } from '@/gpts';

interface GptCardProps {
  gpt: Gpt;
}

export default function GptCard(props: GptCardProps) {
  return (
    <Card className="h-100">
      <CardBody className="d-flex flex-column">
        <CardTitle>{props.gpt.title}</CardTitle>
        <CardText>{props.gpt.description}</CardText>
        <div className="mt-auto">
          <Button
            className="mt-auto"
            variant="primary"
            href={`https://chatgpt.com/g/g-${props.gpt.id}`}
            target="_blank"
          >
            Read More
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
