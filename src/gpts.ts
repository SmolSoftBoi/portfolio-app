export interface Gpt {
  id: string;
  title: string;
  description: string;
  pack: string;
  a?: string;
}

const gpts: Gpt[] = [
  {
    id: 'cpkMPDzj9',
    title: 'Advanced Social Media Strategist',
    description:
      'Creates consistent, efficient, customised social media strategies.',
    pack: 'Social Media Manager',
    a: 'SL',
  },
  {
    id: '20gHoPEL3',
    title: 'Apparel Development Assistant',
    description: 'Expert in apparel.',
    pack: 'Product Development',
    a: 'SL',
  },
  {
    id: 'M4coYtWOQ',
    title: 'Article Writing Assistant',
    description:
      'Streamlines article creation with clear language and cohesive structure.',
    pack: 'Research',
    a: 'SL',
  },
  {
    id: 'aqJNIv5y2',
    title: 'Blog Content Creater',
    description: 'I assist with new blog content, from name to content.',
    pack: 'Blog Manager',
    a: 'SL',
  },
  {
    id: 'CXqmylFwS',
    title: 'Brand Builder',
    description: 'Brand expert focused on research and optimisation.',
    pack: 'Brand Builder',
    a: 'SL',
  },
  {
    id: 'XTtiergjL',
    title: 'Business Formation Assistant',
    description: 'Expert in forming tailored businesses.',
    pack: 'Business Assistant',
    a: 'SL',
  },
  {
    id: 'wcbOFpwOc',
    title: 'Business Planning Assistant',
    description:
      'Expert in business planning and communication, with a focus on clarity and professionalism.',
    pack: 'Business Assistant',
    a: 'SL',
  },
  {
    id: '',
    title: 'Data Analysis',
    description: 'Expert in data analysis, tailored to specific roles.',
    pack: 'Data Analysis',
    a: 'SL',
  },
  {
    id: 'zO9EapKW4',
    title: 'Email Prospecting Assistant',
    description: 'Friendly, detailed guide for crafting effective emails.',
    pack: 'Sales',
    a: 'SL',
  },
  {
    id: 'FmjMUyGxS',
    title: 'Literature Review Assistant',
    description:
      'Efficient and insightful reviewer with customisable reporting.',
    pack: 'Research',
    a: 'SL',
  },
  {
    id: '3t54PuDS5',
    title: 'Poster Development Assistant',
    description: 'Poster strategy expert.',
    pack: 'Product Development',
    a: 'SL',
  },
  {
    id: 'coAMcvFvn',
    title: 'Printful Catalog',
    description: "Expert guide for exploring Printful's catalog.",
    pack: 'Actions',
    a: 'SL',
  },
  {
    id: '4itFNo6xX',
    title: 'Process Analysis',
    description: 'Creative assistant for refining processes.',
    pack: 'Data Analysis',
    a: 'SL',
  },
  {
    id: 'R1TDgI5ww',
    title: 'Product Label Development Assistant',
    description: 'I create unique product label ideas for specific audiences.',
    pack: 'Product Development',
    a: 'SL',
  },
  {
    id: '8riJxcbrM',
    title: 'Research Question Formulation',
    description:
      'I create research questions, analysing and reimagining them creatively.',
    pack: 'Research',
    a: 'SL',
  },
  {
    id: 'mnMCGKCR7',
    title: 'Sales Role Play Assistant',
    description: 'Brainstorms sales ideas.',
    pack: 'Sales',
    a: 'SL',
  },
  {
    id: 'CDG1Dq2Db',
    title: 'Sales Script Assistant',
    description: 'Expert in scripts and content creation for sales.',
    pack: 'Sales',
    a: 'SL',
  },
  {
    id: 'pehj541mM',
    title: 'Sales Strategy Assistant',
    description: 'A sales strategy assistant for ideation and planning.',
    pack: 'Sales',
    a: 'SL',
  },
  {
    id: 'kz6fvnGz4',
    title: 'Social Media Calendar Assistant',
    description:
      'Expert at enhancing social media calendars with flair and clarity across industries.',
    pack: 'Social Media Manager',
    a: 'SL',
  },
  {
    id: '86hnq4Sqi',
    title: 'Social Media Content Creator',
    description: 'Expert at crafting standout social media content.',
    pack: 'Social Media Manager',
    a: 'SL',
  },
  {
    id: 'cJDB5iDJ5',
    title: 'Social Media Growth Coach',
    description: 'Crafts personalised social media coaching.',
    pack: 'Social Media Manager',
    a: 'SL',
  },
  {
    id: 'xj087tGpB',
    title: 'Trianglify',
    description: 'Creates unique, aesthetically pleasing triangle patterns.',
    pack: 'Images',
  },
  {
    id: 'q8gkKMGNs',
    title: 'Yodeyma',
    description: 'Focused on Yodeyma, and inspiring positive change.',
    pack: 'Shopping',
  },
];

export const gptPacks: string[] = [
  ...new Set(gpts.map((pack) => pack.pack)),
].sort();

export default gpts;
