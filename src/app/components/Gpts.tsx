'use client';

import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { Gpt, gptPacks } from '@/gpts';
import GptCard from './GptCard';
import SupportButton from './SupportButton';

interface GptsProps {
  gpts: Gpt[];
}

export default function Gpts(props: GptsProps) {
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (tech: string) => {
    setFilter(tech);
  };

  return (
    <>
      <Row>
        <Col className="text-center mb-3">
          <Button
            variant={`${filter === 'All' ? 'primary' : 'secondary'}`}
            className={`mb-2 ${filter === 'All' ? 'active' : ''}`}
            onClick={() => handleFilterChange('All')}
          >
            All
          </Button>
          {gptPacks.map((pack, index) => (
            <Button
              key={index}
              variant={`${filter === pack ? 'primary' : 'secondary'}`}
              className={`mb-2 ms-2 ${filter === pack ? 'active' : ''}`}
              onClick={() => handleFilterChange(pack)}
            >
              {pack}
            </Button>
          ))}
        </Col>
      </Row>
      <Row>
        {props.gpts
          .filter((gpt) => filter === 'All' || gpt.pack === filter)
          .map((gpt, index) => (
            <GptCard key={gpt.id} gpt={gpt} />
          ))}
        <Col
          md={4}
          className="mb-4 d-flex align-items-center justify-content-center"
        >
          <SupportButton />
        </Col>
      </Row>
    </>
  );
}

Gpts.defaultProps = {
  show: true,
};
