'use client';

import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { Gpt } from '@/gpts';
import GptCard from './GptCard';

interface GptsProps {
  gpts: Gpt[];
}

export default function Gpts(props: GptsProps) {
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (tech: string) => {
    setFilter(tech);
  };

  const filteredGpts =
    filter === 'All'
      ? props.gpts
      : props.gpts.filter((project) => project.pack.includes(filter));

  return (
    <>
      <Row>
        <Col className="text-center mb-5">
          <Button
            variant={`${filter === 'All' ? 'primary' : 'secondary'}`}
            className={filter === 'All' ? 'active' : ''}
            onClick={() => handleFilterChange('All')}
          >
            All
          </Button>
          {['Blog Manager', 'Product Development'].map((tech, index) => (
            <Button
              key={index}
              variant={`${filter === tech ? 'primary' : 'secondary'}`}
              className={`ms-2 ${filter === tech ? 'active' : ''}`}
              onClick={() => handleFilterChange(tech)}
            >
              {tech}
            </Button>
          ))}
        </Col>
      </Row>
      <Row>
        {filteredGpts.map((gpt, index) => (
          <Col md={6} key={index} className="mt-5 mb-4">
            <GptCard gpt={gpt} />
          </Col>
        ))}
      </Row>
    </>
  );
}
