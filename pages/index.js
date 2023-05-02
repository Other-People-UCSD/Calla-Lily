import Layout from '@/components/layout';
import { getGenrePostsData } from '@/lib/genres';
import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import indexStyles from '@/styles/index.module.scss';
import animationStyles from '@/styles/animations.module.scss';
import postStyles from '@/styles/posts.module.scss';
import homepage from "@/data/homepage.json";
import Genre from '@/components/genre';

export default function Home({ allPostsData, poetry, fiction, nonfiction, visualarts }) {
  return (
    <Layout genre title={"Home"}>
      <div className={indexStyles.IndexContainer}>
        <a href={homepage.featured_link} target="_blank" rel="noopener noreferer">
          <img src={homepage.image} alt={homepage.featured_alt} />
          <h4>{homepage.featured_piece_name} by {homepage.featured_contributor}</h4>
        </a>
      </div>
      <h1 className={`${indexStyles["index-title"]} ${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
        {homepage.term} &mdash;<br />Collection No. {homepage.collection}<br />{homepage.theme}
      </h1>

      <h3 className={postStyles["post-title"]}>Poetry</h3>
      <Genre genre={poetry} offset={3} limit={2}/>

      <h3 className={postStyles["post-title"]}>Fiction</h3>
      <Genre genre={fiction} />

      <h3 className={postStyles["post-title"]}>Nonfiction</h3>
      <Genre genre={nonfiction} />

      <h3 className={postStyles["post-title"]}>Visual Arts</h3>
      <Genre genre={visualarts} />

      <h2 className={`${indexStyles.w2b} ${postStyles["post-title"]}`}>Keep Reading</h2>

      <h3 className={postStyles["post-title"]}>Poetry</h3>
      <Genre genre={poetry} />

      <h3 className={postStyles["post-title"]}>Fiction</h3>
      <Genre genre={fiction} />

      <h3 className={postStyles["post-title"]}>Nonfiction</h3>
      <Genre genre={nonfiction} />

      <h3 className={postStyles["post-title"]}>Visual Arts</h3>
      <Genre genre={visualarts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const poetry = getGenrePostsData('Poetry');
  const fiction = getGenrePostsData('Fiction');
  const nonfiction = getGenrePostsData('Nonfiction');
  const visualarts = getGenrePostsData('Visual Arts');

  return {
    props: {
      allPostsData,
      poetry,
      fiction,
      nonfiction,
      visualarts,
    },
  };
}