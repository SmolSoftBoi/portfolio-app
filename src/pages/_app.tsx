import '@/global.scss';
import Header from '@/components/Header'
import type { AppProps } from 'next/app'
import Head from 'next/head';
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kristian&amp;s Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Kristian's Portfolio" />
        <meta property="og:description" content="Check out Kristian's portfolio for some awesome projects!" />
        <meta property="og:url" content="https://kristian.matthews-kennington.com" />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  )
}