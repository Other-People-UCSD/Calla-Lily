import '@/styles/globals.scss'
import '@/styles/customPosts.scss';
import { DefaultSeo } from 'next-seo';
import { AppWrapper } from '@/components/appContext';
import Script from 'next/script';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  // The hostname function stops google analytics from tracking our developer activity.
  // This prevent analytics data from skewing results due to editing a page
  return (
    <>
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <Head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1" />
      </Head>
      <DefaultSeo
        openGraph={{
          siteName: 'Other People',
          locale: 'en_US',
          url: 'https://otherpeoplesd.com/',
          type: 'website'
        }}
      />
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  );
}