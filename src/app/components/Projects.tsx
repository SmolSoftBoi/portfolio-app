'use client';

import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import PortfolioCard from './PortfolioCard';
import { Project } from '@/projects';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects(props: ProjectsProps) {
  const [filter, setFilter] = useState('All');

  const filteredProjects =
    filter === 'All'
      ? props.projects
      : props.projects.filter((project) => project.techStack.includes(filter));

  return (
    <>
      <Row>
        <Col className="text-center mb-3">
          <Button
            variant={`${filter === 'All' ? 'primary' : 'secondary'}`}
            className={`mb-2 filter === 'All' ? 'active' : ''`}
            onClick={() => setFilter('All')}
          >
            All
          </Button>
          {[
            'Shopify',
            'JavaScript',
            'TypeScript',
            'HTML',
            'CSS',
            'Node.js',
            'PHP',
          ].map((tech, index) => (
            <Button
              key={index}
              variant={`${filter === tech ? 'primary' : 'secondary'}`}
              className={`mb-2 ms-2 ${filter === tech ? 'active' : ''}`}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </Button>
          ))}
        </Col>
      </Row>
      <Row>
        {filteredProjects.map((project) => (
          <Col md={4} key={project.title} className="mt-5 mb-4">
            <PortfolioCard project={project} />
          </Col>
        ))}
      </Row>
    </>
  );
}
