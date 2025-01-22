import SummarySection from '@/app/components/SummarySection';
import Wishlist from '@/app/components/Wishlist';
import { Metadata } from 'next';
import React from 'react';
import { Container } from 'react-bootstrap';
import { getWishlistItems } from './utils';

export const metadata: Metadata = {
  title: 'Wishlist',
  description: "Check out Kristian's wishlist!",
  keywords: ['wishlist'],
};

export default async function Page() {
  const wishlist = await getWishlistItems();

  return (
    <Container className="mt-5">
      <SummarySection title="Welcome to My Wishlist" />
      <Wishlist wishlist={wishlist} />
    </Container>
  );
}
