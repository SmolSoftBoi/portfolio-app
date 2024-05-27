'use client';

import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import PortfolioCard from './PortfolioCard';
import projects, { Project } from '@/projects';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects(props: ProjectsProps) {
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (tech: string) => {
    setFilter(tech);
  };

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.techStack.includes(filter));

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
              className={`ms-2 ${filter === tech ? 'active' : ''}`}
              onClick={() => handleFilterChange(tech)}
            >
              {tech}
            </Button>
          ))}
        </Col>
      </Row>
      <Row>
        {filteredProjects.map((project, index) => (
          <Col md={4} key={index} className="mt-5 mb-4">
            <PortfolioCard project={project} />
          </Col>
        ))}
      </Row>
    </>
  );
}
