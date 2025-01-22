import { Metadata } from 'next';
import React from 'react';
import { Container } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import SummarySection from '../components/SummarySection';
import QrGenerator from '../components/QrGenerator';

export const metadata: Metadata = {
  title: 'QR Code Generator',
  description: 'Generate QR codes for text, URLs, and Wi-Fi networks.',
};

export default function Page() {
  return (
    <Container className="mt-5">
      <SummarySection
        title="QR Code Generator"
        summary="Generate QR codes for text, URLs, and Wi-Fi networks."
      />
      <QrGenerator />
    </Container>
  );
}
