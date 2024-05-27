import { notFound } from 'next/navigation';
import { getBlogPosts, Metadata } from '../utils';
import { Col, Container, Row } from 'react-bootstrap';
import { PropsWithRef } from 'react';
import { baseUrl } from 'src/app/sitemap';
import CustomMdx from 'src/app/components/CustomMdx';
import Image from 'next/image';
import SummarySection from '@/app/components/SummarySection';

export async function generateStaticParams() {
  let posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type BlogProps = PropsWithRef<{
  params: {
    slug: string;
  };
}>;

export async function generateMetadata({ params }: BlogProps) {
  let post = (await getBlogPosts()).find((post) => post.slug === params.slug);

  if (!post) {
    return;
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    keywords: post.frontmatter.keywords,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      url: `${baseUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.frontmatter.publishedAt,
      images: [
        {
          url: post.frontmatter.image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      images: [post.frontmatter.image],
    },
  };
}

export default async function Blog({ params }: BlogProps) {
  let post = (await getBlogPosts()).find((post) => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <Container className="mt-5">
      <SummarySection
        title={post.frontmatter.title}
        summary={post.frontmatter.summary}
      >
        {post.frontmatter.image ? (
          <Image
            src={`/posts/${post.frontmatter.image}`}
            alt={post.frontmatter.title}
            className="img-fluid rounded"
            placeholder="blur"
            priority
          />
        ) : null}
      </SummarySection>
      <Row className="mb-5">
        <Col>
          <CustomMdx source={post.content} />
        </Col>
      </Row>
    </Container>
  );
}
