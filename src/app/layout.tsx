import '@/app/global.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import { ReactNode } from 'react';
import { baseUrl } from './sitemap';
import profileHeader from '@/public/profile-header.jpg';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Kristian's Portfolio",
    template: "%s | Kristian's Portfolio",
  },
  description: "Check out Kristian's portfolio for some awesome projects!",
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    'portfolio',
    'full-stack development',
    'software developer',
    'process improvement',
    'data analysis',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Kristian Matthews-Kennington', url: baseUrl }],
  creator: 'Kristian Matthews-Kennington',
  openGraph: {
    title: "Kristian's Portfolio",
    description: "Check out Kristian's portfolio for some awesome projects!",
    url: baseUrl,
    siteName: "Kristian's Portfolio",
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: profileHeader.src,
        alt: "Header image for Kristian's portfolio",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kristian's Portfolio",
    description: "Check out Kristian's portfolio for some awesome projects!",
    images: [profileHeader.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          backgroundImage: `url(${profileHeader.src})`,
        }}
      >
        <a className="visually-hidden-focusable" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="page">
          {children}
        </main>
      </body>
    </html>
  );
}
