import '@/styles/globals.scss'
import '@/styles/customPosts.scss';
import { DefaultSeo } from 'next-seo';
export default function App({ Component, pageProps }) {
  // console.log('page props:', pageProps)
  // console.log("components:", Component)
  return (
    <>
      <DefaultSeo
        openGraph={{
          siteName: 'Other People',
          locale: 'en_US',
          url: 'https://otherpeoplesd.com/',
          type: 'website'
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

