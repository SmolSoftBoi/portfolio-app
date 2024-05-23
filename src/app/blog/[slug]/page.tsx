import { notFound } from 'next/navigation';
import { getBlogPosts } from '../utils';
import { Col, Container, Row } from 'react-bootstrap';
import { PropsWithRef } from 'react';
import { baseUrl } from 'src/app/sitemap';
import CustomMdx from 'src/app/components/CustomMdx';

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type BlogProps = PropsWithRef<{
  params: {
    slug: string;
  };
}>;

export function generateMetadata({ params }: BlogProps) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    return;
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    keywords: post.metadata.keywords,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${baseUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.metadata.publishedAt,
      images: [
        {
          url: post.metadata.image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.summary,
      images: [post.metadata.image],
    },
  };
}

export default function Blog({ params }: BlogProps) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1>{post.metadata.title}</h1>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <CustomMdx source={post.content} />
        </Col>
      </Row>
    </Container>
  );
}
