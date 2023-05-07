import Layout from '@/components/layout';
import client from '../tina/__generated__/client'
import indexStyles from '@/styles/index.module.scss';
import animationStyles from '@/styles/animations.module.scss';
import postStyles from '@/styles/posts.module.scss';
import Genre from '@/components/genre';
import { useTina } from 'tinacms/dist/react';
import Image from 'next/image';
import { getSortedPostsData, getGenrePostsData } from '@/lib/posts';

const Home = (props) => {
  const {query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  return (
    <Layout genre title={"Home"}>
      <div className={indexStyles.IndexContainer}>
        <a href={data.homepage.featured_link} target="_blank" rel="noopener noreferer">
          <Image 
            src={data.homepage.image} 
            alt={data.homepage.featured_alt} 
            width={1024}
            height={525}
            quality={50}
            priority={true}
          />
          <h4>{data.homepage.featured_piece_name} by {data.homepage.featured_contributor}</h4>
        </a>
      </div>
      <h1 className={`${indexStyles["index-title"]} ${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
        {data.homepage.term} &mdash;<br />Collection No. {data.homepage.collection}<br />{data.homepage.theme}
      </h1>

      <h3 className={postStyles["post-title"]}>Poetry</h3>
      <Genre genre={props.poetry} limit={data.homepage.poetryLimit} />

      <h3 className={postStyles["post-title"]}>Fiction</h3>
      <Genre genre={props.fiction} limit={data.homepage.fictionLimit} />

      <h3 className={postStyles["post-title"]}>Nonfiction</h3>
      <Genre genre={props.nonfiction} limit={data.homepage.nonfictionLimit} />

      <h3 className={postStyles["post-title"]}>Visual Arts</h3>
      <Genre genre={props.visualarts} limit={data.homepage.visartsLimit} />

      <h2 className={`${indexStyles.w2b} ${postStyles["post-title"]}`}>Keep Reading</h2>

      <h3 className={postStyles["post-title"]}>Poetry</h3>
      <Genre genre={props.poetry} offset={data.homepage.poetryLimit} limit={6} />

      <h3 className={postStyles["post-title"]}>Fiction</h3>
      <Genre genre={props.fiction} offset={data.homepage.fictionLimit} limit={6} />

      <h3 className={postStyles["post-title"]}>Nonfiction</h3>
      <Genre genre={props.nonfiction} offset={data.homepage.nonfictionLimit} limit={6} />

      <h3 className={postStyles["post-title"]}>Visual Arts</h3>
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