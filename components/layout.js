import Head from 'next/head';
import HeaderMain from './header';
import Footer from './footer';
import postStyles from '@/styles/posts.module.scss';
import { NextSeo } from 'next-seo';

export default function Layout({ children, post, landingPage, title, announcementData, footerConfig, className }) {
  const siteTitle = title ? (`${title} - Other People`) : (`Other People`);

  function Content() {
    if (landingPage) {
      return <>
        <hr style={{ marginTop: "64px" }} />
        <main className={`main__landing ${className}`}>{children}</main>
      </>
    } else if (post) {
      return <>
        <hr style={{ marginTop: "64px" }} />
        <main className={`${postStyles.post__content} ${className}`}>{children}</main>
      </>
    } else {
      return <main className={`${className}`}>{children}</main>
    }
  }

  function OPMSEO() {
    const favicon = 'https://www.otherpeoplesd.com/favicons/favicon-32x32.png';
    return (
      <>
        <NextSeo
          title={siteTitle}
          description='Other People Literary Magazine is UC San Diego’s first student-run literary magazine and club. 
        We wish to present the dynamic range of artistic capability inherent in UCSD students, to create an 
        inclusive platform to share creative works, and to encourage literary and artistic exploration 
        among all students. We seek to embrace our core principle of showcasing “O(the)r People,” or celebrating 
        at once our diversity, our individual uniqueness, our shared experiences, and our collective journey through this world.'
          openGraph={{
            images: [{ url: favicon }]
          }
          }
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" crossOrigin="use-credentials" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <OPMSEO />
      <HeaderMain landingPage={landingPage} title={title} announcementData={announcementData} />
      <Content>{children}</Content>
      <Footer footerConfig={footerConfig} />
    </>
  );
}

