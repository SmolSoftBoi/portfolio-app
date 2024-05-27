export interface Gpt {
  id: string;
  title: string;
  description: string;
}

const gpts: Gpt[] = [
  {
    id: '20gHoPEL3',
    title: 'Apparel Development Assistant',
    description: 'Expert in apparel.',
  },
  {
    id: 'aqJNIv5y2',
    title: 'Blog Content Creater',
    description: 'I assist with new blog content, from name to content.',
  },
];

export default gpts;
