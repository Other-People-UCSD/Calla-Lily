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
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-CR21DPVQJ3" strategy="afterInteractive" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          if (document.location.hostname.includes('otherpeoplesd.com')) {
            gtag('config', 'G-CR21DPVQJ3');
          } else {
            gtag('config', 'G-CR21DPVQJ3', { 'debug_mode':true });
          }`}
      </Script>
      <DefaultSeo
        openGraph={{
          siteName: 'Other People',
          locale: 'en_US',
          url: 'https://www.otherpeoplesd.com/',
          type: 'website'
        }}
      />
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  );
}
