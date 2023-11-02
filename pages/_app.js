import '@/styles/globals.scss'
import '@/styles/customPosts.scss';
import { DefaultSeo } from 'next-seo';
import { AppWrapper } from '@/components/appContext';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  // The hostname function stops google analytics from tracking our developer activity.
  // This prevent analytics data from skewing results due to editing a page
  return (
    <>
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
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
