export interface Gpt {
  id: string;
  title: string;
  description: string;
  pack: string;
}

const gpts: Gpt[] = [
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
];

export default gpts;
