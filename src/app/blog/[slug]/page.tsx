import { notFound } from 'next/navigation';
import { getBlogPosts } from '../utils';
import Head from 'next/head';
import { Col, Container, Row } from 'react-bootstrap';
import CustomMdx from '@/app/components/CustomMdx';
import { PropsWithRef } from 'react';

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

export default function Blog({ params }: BlogProps) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Head>
        <meta name="description" content={post.metadata.summary} />
        <meta name="keywords" content={post.metadata.keywords} />
      </Head>
      <Container className="mt-5">
        <Row className="mb-5">
          <Col className="text-center">
            <h1>{post.metadata.title}</h1>
            <p>
              <CustomMdx source={post.content} />
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
