import barkProfilePic from '@/public/bark/profile-picture.png';
import bearBeltsProfilePic from '@/public/bear-belts/profile-picture.png';
import coulsdonPartnershipProfilePic from '@/public/coulsdon-partnership/profile-picture.png';
import cozyGlowProfilePic from '@/public/cozy-glow/profile-picture.png';
import nodeSublerProfilePic from '@/public/node-subler/profile-picture.png';
import pocketBearsApparelProfilePic from '@/public/pocket-bears-apparel/profile-picture.png';
// import sizzleSoakProfilePic from '@/public/sizzle-soak/profile-picture.png';
// import pomodoroProfilePic from '@/public/pomodoro-timer/profile-picture.png';
import patternGeneratorProfilePic from '@/public/pattern-generator/profile-picture.png';
import { StaticImageData } from 'next/image';

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link: string;
  headerImage?: StaticImageData;
  profileImage: StaticImageData;
}

const projects: Project[] = [
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
    title: 'Coulsdon Community Partnership',
    description: 'A community website for the Coulsdon area in London.',
    techStack: ['Shopify', 'JavaScript', 'HTML', 'CSS'],
    link: 'https://coulsdonpartnership.org',
    profileImage: coulsdonPartnershipProfilePic,
  },
  /* {
    title: 'Sizzle & Soak',
    description:
      'A luxury bath products store offering a range of soaps, bath bombs, and more.',
    techStack: ['Shopify', 'JavaScript', 'HTML', 'CSS'],
    link: 'https://sizzleandsoak.store',
    profileImage: sizzleSoakProfilePic,
  }, */
  /* {
    title: 'Pomodoro Timer',
    description:
      'A sleek, responsive Pomodoro timer app with custom animations, and task management.',
    techStack: ['React', 'Next.js', 'TypeScript', 'CSS'],
    link: 'https://github.com/SmolSoftBoi/pomodoro-timer', // GitHub repo or live app link
    profileImage: pomodoroProfilePic,
  }, */
  {
    title: 'Pattern Generator',
    description:
      'A versatile pattern generator built to create unique and customizable patterns for various uses.',
    techStack: ['Node.js', 'TypeScript', 'HTML', 'CSS'],
    link: 'https://smolsoftboi.github.io/pattern-generator',
    profileImage: patternGeneratorProfilePic,
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

export default projects;
