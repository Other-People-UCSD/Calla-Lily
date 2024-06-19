import Image from 'next/image';
import styles from '@/styles/homepage.module.scss';
import Layout from '@/components/layout';
import client from '../tina/__generated__/client';
import { useTina } from 'tinacms/dist/react';
import { getSortedPostsData, getGenrePostsData } from '@/lib/posts';
import { PostCardSelector } from '../components/PostCard';
import { NewsletterForm } from '@/components/footer';
import Link from 'next/link';
import OPMparser from '@/lib/OPMparser';

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
      <div className={styles.hero}>
        <div className={styles.hero__imgbox}>
          <div className={`${styles.hero__img_placeholder} ${styles.hero__img_placeholder1}`} />
          <div className={`${styles.hero__img_placeholder} ${styles.hero__img_placeholder2}`} />
          <p className={`${styles.hero__text}`}>We are <br />
          <strong>Other People Magazine</strong>.</p>
        </div>
      </div>

      <div className={styles.hero_mag__container}>
        <div className={styles.hero_mag__track}>
          <div className={styles.hero_mag__cover_frame}>
            <div className={styles.block__img__container}>
              <Image className={`${styles.img__cover}`}
                src={data.homepage.hero_items[0].image_cover} fill={true}
                sizes='1080px'
                alt={data.homepage.hero_items[0].image_alt} />
              <p className={styles.block__img__caption}>{data.homepage.hero_items[0].image_caption}</p>
            </div>
          </div>
          <div className={styles.hero_mag__contentbox}>
            <div className={styles.hero_mag__content__title}>Collection No. {data.homepage.hero_items[0].collection_num} | <strong>{data.homepage.hero_items[0].collection_theme}</strong></div>

            <div className={styles.hero_mag__editorsnote}>
              <OPMparser content={data.homepage.hero_items[0].editors_note_text} depth={0} />
              <Link href={data.homepage.hero_items[0].editors_note_link}>Read More</Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.uib_section__post_selector}>
        <PostCardSelector postEntries={{
          poetry: props.poetry,
          fiction: props.fiction,
          nonfiction: props.nonfiction,
          visualarts: props.visualarts
        }} />
      </div>

      <div className={styles.section__newsletter}>
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
    </Layout>
  )
}


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const numPosts = allPostsData.length;
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
      numPosts,
      poetry,
      fiction,
      nonfiction,
      visualarts,
    },
  };
}

export const SpriteIcon = ({ id, className, ...props }) => {
  return <svg className={className} {...props}>
    <use href={`/svg/sprites.svg#${id}`} />
  </svg>
}