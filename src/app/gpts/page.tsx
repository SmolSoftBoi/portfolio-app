import React from 'react';
import { Container } from 'react-bootstrap';

import type { StaticImageData } from 'next/image';
import { Metadata } from 'next';
import SummarySection from '../components/SummarySection';
import gpts from '@/gpts';
import Gpts from '../components/Gpts';

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link: string;
  headerImage?: StaticImageData;
  profileImage: StaticImageData;
}

export const metadata: Metadata = {
  title: 'GPTs',
  description: "Check out Kristian's GPTS for some awesomeness!",
  keywords: ['gpt'],
};

export default function Page() {
  return (
    <Container className="mt-5">
      <SummarySection
        title="Welcome to My GPTs"
        summary="Discover my custom versions of ChatGPT that combine instructions, extra knowledge, and a combination of skills."
      />
      <Gpts gpts={gpts} />
    </Container>
  );
}
