import React from 'react';

interface SummarySectionProps extends React.PropsWithChildren {
  title: string;
  summary?: string;
}

export default function SummarySection(props: SummarySectionProps) {
  return (
    <div className="summary-section text-center mb-5">
      <h1>{props.title}</h1>
      {props.summary ? <p>{props.summary}</p> : null}
      {props.children}
    </div>
  );
}
