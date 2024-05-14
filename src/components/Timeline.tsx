import React from 'react';
import { Card } from 'react-bootstrap';

interface TimelineItemProps {
  title: string;
  content: string;
}

export function TimelineItem(props: TimelineItemProps) {
  return (
    <div className="timeline-item">
      <Card>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>{props.content}</Card.Body>
      </Card>
    </div>
  );
}

interface TimelineProps extends React.PropsWithChildren {}

export function Timeline(props: TimelineProps) {
  return <div className="timeline">{props.children}</div>;
}
