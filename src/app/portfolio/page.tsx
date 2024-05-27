import React from 'react';
import { Container } from 'react-bootstrap';

import type { StaticImageData } from 'next/image';
import { Metadata } from 'next';
import projects from '@/projects';
import SummarySection from '../components/SummarySection';
import Projects from '../components/Projects';

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link: string;
  headerImage?: StaticImageData;
  profileImage: StaticImageData;
}

export const metadata: Metadata = {
  title: 'Portfolio',
  description: "Check out Kristian's portfolio for some awesome projects!",
  keywords: ['portfolio', 'full-stack', 'development', 'Shopify', 'JavaScript'],
};

export default function Page() {
  return (
    <Container className="mt-5">
      <SummarySection
        title="Welcome to My Portfolio"
        summary="I specialize in full-stack development, particularly with Shopify and
        JavaScript. Passionate about creating efficient, user-friendly
        experiences."
      />
      <Projects projects={projects} />
    </Container>
  );
}
