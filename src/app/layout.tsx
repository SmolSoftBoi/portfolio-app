import '@/app/global.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import { ReactNode } from 'react';
import { baseUrl } from './sitemap';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Kristian's Portfolio",
    template: "%s | Kristian's Portfolio",
  },
  description: "Check out Kristian's portfolio for some awesome projects!",
  icons: '/favicon.ico',
  openGraph: {
    title: "Kristian's Portfolio",
    description: "Check out Kristian's portfolio for some awesome projects!",
    url: baseUrl,
    siteName: "Kristian's Portfolio",
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kristian's Portfolio",
    description: "Check out Kristian's portfolio for some awesome projects!",
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
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
