import Image from 'next/image';
import styles from '@/styles/homepage.module.scss';
import Layout from '@/components/layout';
import client from '../tina/__generated__/client';
import { useTina } from 'tinacms/dist/react';
import { getSortedPostsData, getGenrePostsData, getPostDataAPI } from '@/lib/posts';
import { PostCardSelector } from '../components/PostCard';
import { NewsletterForm } from '@/components/footer';
import { CarouselSlickDesktop, CarouselSlickMobile } from '@/components/Carousel';

export default function Home(props) {
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const footerConfig = {
    'showMore': true,
  }

  return (
    <Layout homepage footerConfig={footerConfig} className={`${styles.main}`}>
      <div className={`${styles.hero} ${styles["hero--desktop"]}`}>
        <div className={styles.hero__imgbox}>
          <p className={`${styles.hero__textbox}`}>This is <br />
            <strong>Other People Magazine</strong>.</p>
          <div className={`${styles.hero__img_placeholder} ${styles.hero__img_placeholder1}`} />
          <div className={`${styles.hero__img_placeholder} ${styles.hero__img_placeholder2}`} />
        </div>
      </div>

      <div className={`${styles.hero} ${styles["hero--mobile"]}`}>
        <div className={`${styles.hero__textbox}`}>
          <p className={styles["hero__text--h1"]}>Other People</p>
          <hr />
          <p className={styles["hero__text--subtitle"]}>a literary and visual arts magazine</p></div>
        <div className={styles.hero__imgbox}>
          <div className={`${styles.hero__img_placeholder} ${styles.hero__img_placeholder1}`} />
          <div className={`${styles.hero__img_placeholder} ${styles.hero__img_placeholder2}`} />
        </div>
      </div>

      <CarouselSlickDesktop collectionEntries={data.homepage.hero_items} />
      <CarouselSlickMobile collectionEntries={data.homepage.hero_items} />

      <PostCardSelector postEntries={{
        poetry: props.poetry,
        fiction: props.fiction,
        nonfiction: props.nonfiction,
        visualarts: props.visualarts
      }} />

      <div className={styles.section__newsletter}>
        <div className={styles.newsletter__wrapper}>

          <div className={styles.newsletter__previews}>
            <Image
              src="/news_1.webp"
              width={300} height={150}
              className={styles.newsletter_1}
              alt="A preview of our digital newsletter."
            />
            <Image
              src="/news_2.webp"
              width={300} height={300}
              className={styles.newsletter_2}
              alt="A preview of our digital newsletter."
            />
            <Image
              src="/news_3.webp"
              width={300} height={300}
              className={styles.newsletter_3}
              alt="Another preview of our digital newsletter."
            />

          </div>
          <NewsletterForm homepage />
        </div>
      </div>
    </Layout>
  )
}


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const numPosts = allPostsData.length;
  const poetry = await Promise.all(
    getGenrePostsData('Poetry', allPostsData).slice(0, 3)
      .map(async (post) => {
        return await getPostDataAPI({ relativePath: post.slug + '.mdx', headerType: 'preview' });
      }));
  const fiction = await Promise.all(
    getGenrePostsData('Fiction', allPostsData).slice(0, 3).map(async (post) => {
      return await getPostDataAPI({ relativePath: post.slug + '.mdx', headerType: 'preview' });
    }));
  const nonfiction = await Promise.all(
    getGenrePostsData('Nonfiction', allPostsData).slice(0, 3).map(async (post) => {
      return await getPostDataAPI({ relativePath: post.slug + '.mdx', headerType: 'preview' });
    }));
  const visualarts = await Promise.all(
    getGenrePostsData('Visual Arts', allPostsData).slice(0, 3).map(async (post) => {
      return await getPostDataAPI({ relativePath: post.slug + '.mdx', headerType: 'preview' });
    }));

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
      numPosts,
      poetry,
      fiction,
      nonfiction,
      visualarts,
    },
  };
}