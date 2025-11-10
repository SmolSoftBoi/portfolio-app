import { getBlogPosts } from './blog/utils';

export const baseUrl = 'https://kristian.matthews-kennington.com';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function sitemap() {
  let routes = ['', '/about', '/portfolio'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  let blogs = (await getBlogPosts()).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.frontmatter.publishedAt,
  }));

  return [...routes, ...blogs];
}
