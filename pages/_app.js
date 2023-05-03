import '@/styles/globals.scss'
import '@/styles/customPosts.scss';

export default function App({ Component, pageProps }) {
  // console.log('page props:', pageProps)
  // console.log("components:", Component)
  return <Component {...pageProps} />
}

