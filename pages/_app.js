import '@/styles/globals.scss'
import '@/styles/customPosts.scss';
import { AppWrapper } from '@/components/appContext';

export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
