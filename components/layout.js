import Head from 'next/head';
import HeaderMain from './header';
import Footer from './footer';
import contentStyles from '@/styles/content.module.scss';

export default function Layout({children, post, genre, title}) {
  // console.log('layour children:', children)
  function Content() {
    if (genre) {
      return <>{children}</>;
    } else if (post) {
      return <main className={contentStyles.content}>{children}</main>;
    } else {
      return <main>{children}</main>
    }
  }

  const siteTitle = title ? (`${title} - Other People`) : (`Other People`);
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" crossOrigin="use-credentials"/>
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <title>{siteTitle}</title>
      </Head>
      <HeaderMain />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}

 