import Layout from '@/components/layout';
import client from '../tina/__generated__/client'
import indexStyles from '@/styles/index.module.scss';
import animationStyles from '@/styles/animations.module.scss';
import postStyles from '@/styles/posts.module.scss';
import Genre from '@/components/genre';
import { useTina } from 'tinacms/dist/react';
import Image from 'next/image';
import { getSortedPostsData, getGenrePostsData } from '@/lib/posts';
import { useEffect, useRef } from 'react';
import { setDarkTheme, setLightTheme } from '@/lib/bgTheme';

const Home = (props) => {
  const keepReadingRef = useRef(null);
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  useEffect(() => {
    /**
     * Homepage only.
     * When the user scrolls to the "keep reading" section marked by the "keep__reading" class, 
     * the style of the page changes to dark mode. 
     * If the user's client preference is dark mode, scrolling beyond the "keep reading" section
     * will cause that section to become light mode instead.
     */
    function homepageChange() {
      try {
        const windowHeight = window.innerHeight / 3.5;
        const scrollY = this.scrollY;
        const bgChange = keepReadingRef.current.offsetTop;

        if (scrollY >= bgChange - windowHeight) {
          setDarkTheme();
        } else {
          setLightTheme();
        }
      } catch {
        // May catch ref undefined when quickly bouncing homepage to a different page
      }
    }

    window.addEventListener('scroll', homepageChange);
    return () => {
      window.removeEventListener('scroll', homepageChange);
    }
  });

  return (
    <Layout landingPage title={"Home"} announcementData={data.homepage.announcement}>
      <div>
        <a href={data.homepage.featured_link} target="_blank" rel="noopener noreferer"
          className={indexStyles.cover__link}>
          <Image
            src={data.homepage.image}
            alt={data.homepage.featured_alt}
            className={indexStyles.cover__img}
            width={1024}
            height={525}
            quality={75}
            priority={true}
          />
          <p className={indexStyles.cover__credits}>
            {data.homepage.featured_piece_name} by {data.homepage.featured_contributor}
          </p>
        </a>
      </div>
      <h1 className={`${indexStyles["index__title"]} ${animationStyles.fadeInBottom}`}>
        {data.homepage.term} &mdash;<br />Collection No. {data.homepage.collection}<br />{data.homepage.theme}
      </h1>

      <h3 className={postStyles.genre__title}>Poetry</h3>
      <Genre genre={props.poetry} limit={data.homepage.poetryLimit} />

      <h3 className={postStyles.genre__title}>Fiction</h3>
      <Genre genre={props.fiction} limit={data.homepage.fictionLimit} />

      <h3 className={postStyles.genre__title}>Nonfiction</h3>
      <Genre genre={props.nonfiction} limit={data.homepage.nonfictionLimit} />

      <h3 className={postStyles.genre__title}>Visual Arts</h3>
      <Genre genre={props.visualarts} limit={data.homepage.visartsLimit} />

      <h2
        ref={keepReadingRef}
        className={`${indexStyles.w2b} ${indexStyles.keep__reading}`}
      >Keep Reading</h2>

      <h3 className={postStyles.genre__title}>Poetry</h3>
      <Genre genre={props.poetry} offset={data.homepage.poetryLimit} limit={6} />

      <h3 className={postStyles.genre__title}>Fiction</h3>
      <Genre genre={props.fiction} offset={data.homepage.fictionLimit} limit={6} />

      <h3 className={postStyles.genre__title}>Nonfiction</h3>
      <Genre genre={props.nonfiction} offset={data.homepage.nonfictionLimit} limit={6} />

      <h3 className={postStyles.genre__title}>Visual Arts</h3>
      <Genre genre={props.visualarts} offset={data.homepage.visartsLimit} limit={6} />
    </Layout>
  );
}

export default Home;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const poetry = getGenrePostsData('Poetry', allPostsData);
  const fiction = getGenrePostsData('Fiction', allPostsData);
  const nonfiction = getGenrePostsData('Nonfiction', allPostsData);
  const visualarts = getGenrePostsData('Visual Arts', allPostsData);

  let data = {}
  let query = {}
  let variables = { relativePath: `../data/homepage.json` }

  try {
    const res = await client.queries.homepage(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
      allPostsData,
      poetry,
      fiction,
      nonfiction,
      visualarts,
    },
  };
}

