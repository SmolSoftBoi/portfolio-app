import React from 'react';
import { Card, CardBody, CardHeader } from 'react-bootstrap';

interface TimelineItemProps {
  title: string;
  content: string;
}

export function TimelineItem(props: TimelineItemProps) {
  return (
    <div className="timeline-item">
      <Card>
        <CardHeader>{props.title}</CardHeader>
        <CardBody>{props.content}</CardBody>
      </Card>
    </div>
  );
}

interface TimelineProps extends React.PropsWithChildren {}

export default function Timeline(props: TimelineProps) {
  return <div className="timeline">{props.children}</div>;
}
