import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/logo.svg" type="image/svg" />
      </Head>
      <body className='bg-dark-blue-700'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}