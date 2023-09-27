import React, { useState } from 'react';
import Image from 'next/image';
import { Container, Row, Col, Card, Button, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';

import cozyGlowProfilePic from '@/public/cozy-glow/profile-picture.png';
import bearBeltsProfilePic from '@/public/bear-belts/profile-picture.png';
import pocketBearsApparelProfilePic from '@/public/pocket-bears-apparel/profile-picture.png';
import sizzleSoakProfilePic from '@/public/sizzle-soak/profile-picture.png';
import barkProfilePic from '@/public/bark/profile-picture.png';
import PortfolioCard from '@/components/PortfolioCard';
import Head from 'next/head';
import type { StaticImageData } from 'next/image';

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link: string;
  headerImage: string;
  profileImage: StaticImageData;
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const projects = [
    {
      title: 'Cozy Glow',
      description: 'An e-commerce platform specializing in home fragrances, built on Shopify.',
      techStack: ['Shopify', 'HTML', 'CSS'],
      link: 'https://cozyglow.store',
      headerImage: '/path/to/header-image.jpg',
      profileImage: cozyGlowProfilePic
    },
    {
      title: 'Bear Belts',
      description: 'An online store offering premium quality belts with a focus on durability and style.',
      techStack: ['Shopify', 'JavaScript', 'CSS'],
      link: 'https://bearbelts.store',
      headerImage: '/path/to/header-image.jpg',
      profileImage: bearBeltsProfilePic
    },
    {
      title: 'Pocket Bears Apparel',
      description: 'A fashion-forward apparel brand that combines comfort with modern design.',
      techStack: ['Shopify', 'JavaScript', 'CSS'],
      link: 'https://pocketbearsapparel.store',
      headerImage: '/path/to/header-image.jpg',
      profileImage: pocketBearsApparelProfilePic
    },
    {
      title: 'Sizzle & Soak',
      description: 'A luxury bath products store offering a range of soaps, bath bombs, and more.',
      techStack: ['Shopify', 'JavaScript', 'CSS'],
      link: 'https://sizzleandsoak.store',
      headerImage: '/path/to/header-image.jpg',
      profileImage: sizzleSoakProfilePic
    },
    {
      title: 'bark.com',
      description: 'Contributed to full-stack development on the Bark.com website, enhancing user experience and performance.',
      techStack: ['PHP', 'JavaScript', 'HTML'],
      link: 'https://bark.com',
      headerImage: '/path/to/header-image.jpg',
      profileImage: barkProfilePic
    }
  ];

  const handleFilterChange = (tech: string) => {
    setFilter(tech);
  };

  const filteredProjects = filter === 'All' ? projects : projects.filter(project => project.techStack.includes(filter));

  // Summary section
  const SummarySection = () => (
    <div className='summary-section text-center mb-5'>
      <h2>Welcome to My Portfolio</h2>
      <p>I specialize in full-stack development, particularly with Shopify and JavaScript. Passionate about creating efficient, user-friendly experiences.</p>
    </div>
  );

  return (
    <>
      <Head>
        <meta name='description' content='Check out my portfolio for examples of my full-stack development work, specializing in Shopify and JavaScript.' />
        <meta name='keywords' content='portfolio, full-stack development, Shopify, JavaScript' />
      </Head>
      <Container className='mt-5'>
        <SummarySection />
        <Row>
          <Col className='text-center mb-5'>
            <Button variant='secondary' className={filter === 'All' ? 'active' : ''} onClick={() => handleFilterChange('All')}>All</Button>
            {['Shopify', 'JavaScript', 'HTML', 'CSS', 'PHP'].map((tech, index) => (
              <Button key={index} variant='secondary' className={`ms-2 ${filter === tech ? 'active' : ''}`} onClick={() => handleFilterChange(tech)}>{tech}</Button>
            ))}
          </Col>
        </Row>
        <Row>
          {filteredProjects.map((project, index) => (
            <Col md={4} key={index} className='mt-5 mb-4'>
              <PortfolioCard project={project}/>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};