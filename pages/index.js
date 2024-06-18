import Image from 'next/image';
import styles from '@/styles/homepage.module.scss';
import Layout from '@/components/layout';
import client from '../tina/__generated__/client';
import { useTina } from 'tinacms/dist/react';
import { getSortedPostsData, getGenrePostsData, getGroupedPostsData } from '@/lib/posts';
import { PostCardSelector } from '../components/PostCard';
import { Randomizer } from '@/components/Randomizer';
import { NewsletterForm } from '@/components/footer';
import { CarouselSlickMobile } from '@/components/Carousel';
import Link from 'next/link';

export default function Home(props) {
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const footerConfig = {
    'showNewsletter': false,
  }

  return (
    <Layout homepage footerConfig={footerConfig} className={`${styles.main}`}>
      <div className={styles.hero}>
        <div className={`${styles.hero__img__container}`}>
          <svg className={`${styles["animate--rotate"]}`}>
            <use href="svg/sprites.svg#other-people-homepage-circle" />
          </svg>
        </div>
        <p className={`${styles.hero__text}`}>the <span className={styles["hero__text--italic"]}>visual</span> and <span className={styles["hero__text--thin"]}>literary</span> <br />
          arts <span style={{ textDecoration: 'underline' }}>magazine</span>.</p>
      </div>

      <div className={`${styles.collection__block}`}>
        <div className={styles.block__img__container}>
          <Image className={`${styles.img__cover}`}
            src="/images/6/liminal-cover-caroline-tjoe.webp" fill={true}
            sizes='1080px'
            alt={data.homepage.featured_alt} />
            <p className={styles.block__img__caption}>{data.homepage.featured_piece_name} by {data.homepage.featured_contributor}</p>
        </div>
        <div className={`${styles.collection__block__text}`}>
          <p className={`text--heading_1 ${styles.collection__date}`}>{data.homepage.term}</p>
          <hr className={styles.collection__block__hr} />
          <p className={`text--heading_1 ${styles.collection__number}`}>Collection No. {data.homepage.collection}</p>
          <p className={`text--heading_1 ${styles.collection__title}`}>{data.homepage.theme}</p>
        </div>
      </div>

      <div className={styles.ui3_section__featured}>
        <div className={`${styles.ui3_headline}`}>
          <div className={styles.ui3_marquee}>
            <span>COLLECTION 6 IS OUT!</span>
            <span>LIMINAL IS OUT!</span>
            <span>COLLECTION 6 IS OUT!</span>
            <span>LIMINAL IS OUT!</span>
          </div>
        </div>
        <Randomizer postEntries={props.featuredPosts} group={6} numResults={3} />
        <CarouselSlickMobile postEntries={props.featuredPosts} group={6} numResults={4} />
        <Link href="/search?collections=6" className={styles.featured__btn_link}>Keep Browsing</Link>
      </div>

      <div className={styles.ui3_section__flipbook}>
        <div className={`${styles.ui3_headline}`}>
          <div className={styles.ui3_marquee}>
            <span>View Issues on Issuu...</span>
            <span>View Issues on Issuu...</span>
          </div>
        </div>
        <MagazinesDesktop />
        <MagazinesMobile />
      </div>

      <div className={styles.ui3_section__post_selector}>
        <div className={styles.ui3_headline}>
          <div className={styles.ui3_marquee}>
            <span>Our latest posts...</span>
            <span>Discover {props.numPosts} publications!</span>
            <span>Our latest posts...</span>
            <span>Discover {props.numPosts} publications!</span>
          </div>
        </div>
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
  const featuredPosts = await getGroupedPostsData({ group: 'collection', value: '6', input: allPostsData });

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
      featuredPosts
    },
  };
}

const MagazinesDesktop = () => {
  return (
    <div className={`${styles.flipbook__container} ${styles.flipbook__desktop}`}>
      <div className={styles.flipbook__track}>
        {Object.entries({
          "/images/cover/collection-1-cover.webp": "https://issuu.com/otherpeoplesd/docs/otherpeople_31jul2020",
          "/images/cover/midnight-oil-cover.webp": "https://issuu.com/otherpeoplesd/docs/midnight_oil_final_version",
          "/images/cover/self-identity-cover-kristy-lee.webp": "https://issuu.com/otherpeoplesd/docs/collection_3",
          "/images/cover/refraction-cover-caroline-tjoe.webp": "https://issuu.com/otherpeoplesd/docs/refractionissuu"
        }).map(([url, link], idx) => {
          return <a key={idx} href={link} target='_blank' rel={"noopener noreferer"}
            className={styles.flipbook__frame}>
            <Image src={url} alt={url}
              fill={true}
              sizes={"300px;"}
            />
          </a>
        })}
      </div>
    </div>)
}

const MagazinesMobile = () => {
  return (
    <div className={`${styles.flipbook__mobile}`}>
      <div className={styles.flipbook__grid}>

        {Object.entries({
          "/images/cover/collection-1-cover.webp": "https://issuu.com/otherpeoplesd/docs/otherpeople_31jul2020",
          "/images/cover/midnight-oil-cover.webp": "https://issuu.com/otherpeoplesd/docs/midnight_oil_final_version",
          "/images/cover/self-identity-cover-kristy-lee.webp": "https://issuu.com/otherpeoplesd/docs/collection_3",
          "/images/cover/refraction-cover-caroline-tjoe.webp": "https://issuu.com/otherpeoplesd/docs/refractionissuu"
        }).map(([url, link], idx) => {
          return <a key={idx} href={link} target='_blank' rel={"noopener noreferer"}
            className={styles.flipbook__frame}>
            <Image src={url} alt={url}
              fill={true}
              sizes={"150px;"}
            />
          </a>
        })}
      </div>
    </div>
  )
}

export const SpriteIcon = ({ id, className, ...props }) => {
  return <svg className={className} {...props}>
    <use href={`/svg/sprites.svg#${id}`} />
  </svg>
}