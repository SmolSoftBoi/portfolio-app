import { readFile, readdir } from 'fs/promises';
import { basename, extname, join } from 'path';

export type Metadata = {
  title: string;
  published: boolean;
  publishedAt: string;
  summary: string;
  keywords: string;
  image?: string;
  imagePrompt?: string;
};

/**
 * Extracts a YAML-style frontmatter block from a file string and returns the parsed metadata alongside the remaining content.
 *
 * The function recognises the following keys in the frontmatter and maps them into the resulting `Metadata`:
 * `title`, `published` (parsed as boolean from `"true"`), `publishedAt`, `summary`, `keywords`, `image`, and `imagePrompt`.
 * Values wrapped in single or double quotes are unwrapped.
 *
 * The input must contain a frontmatter block delimited by `---` lines; behaviour is undefined if no such block is present.
 *
 * @param fileContent - The full text of the file, including the frontmatter block and body
 * @returns An object with `frontmatter` containing the parsed `Metadata` and `content` containing the file body with the frontmatter removed
 */
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
    key = key.trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes

    switch (key) {
      case 'title':
        metadata.title = value;
        break;
      case 'published':
        metadata.published = value === 'true';
        break;
      case 'publishedAt':
        metadata.publishedAt = value;
        break;
      case 'summary':
        metadata.summary = value;
        break;
      case 'keywords':
        metadata.keywords = value;
        break;
      case 'image':
        metadata.image = value;
        break;
      case 'imagePrompt':
        metadata.imagePrompt = value;
        break;
    }
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

/**
 * Retrieve MDX filenames from a directory.
 *
 * @param dir - Path to the directory to scan for `.mdx` files
 * @returns An array of filenames in `dir` that have the `.mdx` extension
 */
async function getMDXFiles(dir: string) {
  return (await readdir(dir)).filter((file) => extname(file) === '.mdx');
}

/**
 * Read an MDX file and extract its frontmatter and remaining body content.
 *
 * @param filePath - Path to the MDX file to read
 * @returns An object with `frontmatter` containing the parsed metadata and `content` containing the file body as a string
 */
async function readMDXFile(
  filePath: string
): Promise<{ frontmatter: Metadata; content: string }> {
  let rawContent = await readFile(filePath, 'utf-8');
  const { frontmatter, content } = await parseFrontmatter(rawContent);

  return {
    frontmatter: frontmatter,
    content: content,
  };
}

/**
 * Load all `.mdx` files from a directory and return their parsed frontmatter, slug and content.
 *
 * @param dir - Path to the directory containing `.mdx` files
 * @returns An array where each item contains `frontmatter` (parsed metadata), `slug` (filename without extension) and `content` (file body)
 */
async function getMDXData(dir: string) {
  let mdxFiles = await getMDXFiles(dir);
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
