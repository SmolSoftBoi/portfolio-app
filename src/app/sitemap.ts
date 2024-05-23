import { getBlogPosts } from './blog/utils';

export const baseUrl = 'https://kristian.matthews-kennington.com';

export default async function sitemap() {
  let routes = ['', '/about', '/portfolio'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  return [...routes, ...blogs];
}
