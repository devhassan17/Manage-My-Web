import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#FBFBFD" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22><rect width=%2232%22 height=%2232%22 rx=%228%22 fill=%22%231D1D1F%22/><path d=%22M9 21V11l7 5 7-5v10%22 stroke=%22%23FFFFFF%22 stroke-width=%222.2%22 fill=%22none%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
