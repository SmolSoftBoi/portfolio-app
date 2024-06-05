'use client';

import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { Gpt, gptPacks } from '@/gpts';
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
          {gptPacks.map((pack, index) => (
            <Button
              key={index}
              variant={`${filter === pack ? 'primary' : 'secondary'}`}
              className={`ms-2 ${filter === pack ? 'active' : ''}`}
              onClick={() => handleFilterChange(pack)}
            >
              {pack}
            </Button>
          ))}
        </Col>
      </Row>
      <Row>
        {filteredGpts.map((gpt, index) => (
          <Col md={4} key={index} className="mb-4">
            <GptCard gpt={gpt} />
          </Col>
        ))}
      </Row>
    </>
  );
}
