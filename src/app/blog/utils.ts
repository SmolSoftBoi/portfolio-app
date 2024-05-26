import { readdirSync, readFileSync } from 'fs';
import { basename, extname, join } from 'path';

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  keywords: string;
  image?: string;
  imagePrompt?: string;
};

async function parseFrontmatter(
  fileContent: string
): Promise<{ frontmatter: Metadata; content: string }> {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return {
    frontmatter: metadata as Metadata,
    content: content,
  };

  /* return (
    await serialize<Record<string, unknown>, Metadata>(fileContent, {
      mdxOptions: {},
      parseFrontmatter: true,
    })
  ).frontmatter; */
}

function getMDXFiles(dir: string) {
  return readdirSync(dir).filter((file) => extname(file) === '.mdx');
}

async function readMDXFile(
  filePath: string
): Promise<{ frontmatter: Metadata; content: string }> {
  let rawContent = readFileSync(filePath, 'utf-8');
  const { frontmatter, content } = await parseFrontmatter(rawContent);

  return {
    frontmatter: frontmatter,
    content: content,
  };
}

async function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return await Promise.all(
    mdxFiles.map(async (file) => {
      let { frontmatter, content } = await readMDXFile(join(dir, file));
      let slug = basename(file, extname(file));

      return {
        frontmatter,
        slug,
        content,
      };
    })
  );
}

export async function getBlogPosts() {
  return await getMDXData(join(process.cwd(), 'src', 'posts'));
}
