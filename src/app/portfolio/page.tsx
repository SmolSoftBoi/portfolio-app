'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import barkProfilePic from '@/public/bark/profile-picture.png';
import bearBeltsProfilePic from '@/public/bear-belts/profile-picture.png';
import cozyGlowProfilePic from '@/public/cozy-glow/profile-picture.png';
import nodeSublerProfilePic from '@/public/node-subler/profile-picture.png';
import pocketBearsApparelProfilePic from '@/public/pocket-bears-apparel/profile-picture.png';
import sizzleSoakProfilePic from '@/public/sizzle-soak/profile-picture.png';
import Head from 'next/head';
import type { StaticImageData } from 'next/image';
import PortfolioCard from '../components/PortfolioCard';

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link: string;
  headerImage?: StaticImageData;
  profileImage: StaticImageData;
}

export default function Page() {
  const [filter, setFilter] = useState('All');

  const projects = [
    {
      title: 'Cozy Glow',
      description:
        'An e-commerce platform specializing in home fragrances, built on Shopify.',
      techStack: ['Shopify', 'JavaScript', 'HTML', 'CSS'],
      link: 'https://cozyglow.store',
      profileImage: cozyGlowProfilePic,
    },
    {
      title: 'Bear Belts',
      description:
        'An online store offering premium quality belts with a focus on durability and style.',
      techStack: ['Shopify', 'JavaScript', 'HTML', 'CSS'],
      link: 'https://bearbelts.store',
      profileImage: bearBeltsProfilePic,
    },
    {
      title: 'Pocket Bears Apparel',
      description:
        'A fashion-forward apparel brand that combines comfort with modern design.',
      techStack: ['Shopify', 'JavaScript', 'HTML', 'CSS'],
      link: 'https://pocketbearsapparel.store',
      profileImage: pocketBearsApparelProfilePic,
    },
    {
      title: 'Sizzle & Soak',
      description:
        'A luxury bath products store offering a range of soaps, bath bombs, and more.',
      techStack: ['Shopify', 'JavaScript', 'HTML', 'CSS'],
      link: 'https://sizzleandsoak.store',
      profileImage: sizzleSoakProfilePic,
    },
    {
      title: 'Node Subler',
      description: 'A Node.js library for interfacing with the Subler CLI.',
      techStack: ['Node.js', 'TypeScript'],
      link: 'https://github.com/SmolSoftBoi/node-subler',
      profileImage: nodeSublerProfilePic,
    },
    {
      title: 'bark.com',
      description:
        'Contributed to full-stack development on the Bark.com website, enhancing user experience and performance.',
      techStack: ['PHP', 'JavaScript', 'HTML', 'CSS'],
      link: 'https://bark.com',
      profileImage: barkProfilePic,
    },
  ];

  const handleFilterChange = (tech: string) => {
    setFilter(tech);
  };

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.techStack.includes(filter));

  // Summary section
  const SummarySection = () => (
    <div className="summary-section text-center mb-5">
      <h1>Welcome to My Portfolio</h1>
      <p>
        I specialize in full-stack development, particularly with Shopify and
        JavaScript. Passionate about creating efficient, user-friendly
        experiences.
      </p>
    </div>
  );

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Check out my portfolio for examples of my full-stack development work, specializing in Shopify and JavaScript."
        />
        <meta
          name="keywords"
          content="portfolio, full-stack development, Shopify, JavaScript"
        />
      </Head>
      <Container className="mt-5">
        <SummarySection />
        <Row>
          <Col className="text-center mb-5">
            <Button
              variant="secondary"
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
                variant="secondary"
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
      </Container>
    </>
  );
}
