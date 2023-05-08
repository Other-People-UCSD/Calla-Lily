import '@/styles/globals.scss'
import '@/styles/customPosts.scss';
import { DefaultSeo } from 'next-seo';
import { AppWrapper } from '@/components/appContext';

export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <DefaultSeo
        openGraph={{
          siteName: 'Other People',
          locale: 'en_US',
          url: 'https://otherpeoplesd.com/',
          type: 'website'
        }}
      />
      <Component {...pageProps} />
    </AppWrapper>
  );
}
