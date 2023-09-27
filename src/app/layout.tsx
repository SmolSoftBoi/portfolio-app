import '@smolpack/bootstrap-extensions/dist/css/bootstrap-extensions.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kristian\'s Portfolio',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
