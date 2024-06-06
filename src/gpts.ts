export interface Gpt {
  id: string;
  title: string;
  description: string;
  pack: string;
}

const gpts: Gpt[] = [
  {
    id: 'cpkMPDzj9',
    title: 'Advanced Social Media Strategist',
    description:
      'Creates consistent, efficient, customised social media strategies.',
    pack: 'Social Media Manager',
  },
  {
    id: '20gHoPEL3',
    title: 'Apparel Development Assistant',
    description: 'Expert in apparel.',
    pack: 'Product Development',
  },
  {
    id: 'aqJNIv5y2',
    title: 'Blog Content Creater',
    description: 'I assist with new blog content, from name to content.',
    pack: 'Blog Manager',
  },
  {
    id: '3t54PuDS5',
    title: 'Poster Development Assistant',
    description: 'Poster strategy expert.',
    pack: 'Product Development',
  },
  {
    id: 'pehj541mM',
    title: 'Sales Strategy Assistant',
    description: 'A sales strategy assistant for ideation and planning.',
    pack: 'Sales',
  },
  {
    id: 'kz6fvnGz4',
    title: 'Social Media Calendar Assistant',
    description:
      'Expert at enhancing social media calendars with flair and clarity across industries.',
    pack: 'Social Media Manager',
  },
];

export const gptPacks: string[] = [
  ...new Set(gpts.map((pack) => pack.pack)),
].sort();

export default gpts;
