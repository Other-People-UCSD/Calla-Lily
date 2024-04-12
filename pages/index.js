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
        <p className={`${styles.hero__text}`}>the <span className={styles["hero__text--italic"]}>visual</span> and <span className={styles["hero__text--thin"]}>literary</span> arts <span style={{ textDecoration: 'underline' }}>magazine</span>.</p>

        <SpriteIcon id="circle-outline" stroke="#FBDA09" strokeWidth="4px" width="100" height="100" x="200px"
          className={styles['svg--accent']} style={{ left: "40vw", top: "20vh" }} />
        <SpriteIcon id="circle-fill" fill="#FEAACE" width="100" height="100"
          className={styles['svg--accent']} style={{ left: "30vw", bottom: "100px" }} />
        <SpriteIcon id="vd-outline" stroke="#DF7D64" strokeWidth="4px" width="150" height="150"
          className={styles['svg--accent']} style={{ right: "10vw", bottom: "20vh", transform: "rotate(-20deg)" }} />
      </div>

      <div className={`${styles.collection__block}`}>
        <div className={styles.block__img__container}>
          <Image className={`${styles.img__cover}`}
            src="/images/6/liminal-cover-caroline-tjoe.webp" fill={true}
            sizes='1080px'
            alt="cover" />
        </div>
        <div className={`${styles.collection__block__text}`}>
          <p className={`text--heading_1 ${styles.collection__date}`}>Spring 2023</p>
          <hr className={styles.collection__block__hr} />
          <p className={`text--heading_1 ${styles.collection__number}`}>Collection No. 6</p>
          <p className={`text--heading_1 ${styles.collection__title}`}>LIMINAL</p>
        </div>

        <SpriteIcon id="circle-fill" fill="#E7EFFB" width="300" height="300"
          className={styles['svg--accent']} style={{ left: "0", top: "0" }} />
        <SpriteIcon id="circle-fill" fill="#3363431A" width="600" height="600"
          className={styles['svg--accent']} style={{ right: "-10vw", bottom: "-40vh" }} />
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

        <SpriteIcon id="circle-fill" fill="#C1665A" width="100" height="100"
          className={styles['svg--accent']} style={{ right: "5vw", top: "150px", }} />
        <SpriteIcon id="circle-outline" stroke="#5DA04C" strokeWidth="4px" width="100" height="100"
          className={styles['svg--accent']} style={{ left: "10vh", bottom: "150px", }} />
        <SpriteIcon id="circle-fill" fill="#9FC9E126" width="600" height="600"
          className={styles['svg--accent']} style={{ right: "-20vw", bottom: "-25vh", }} />
        <SpriteIcon id="circle-fill" fill="#9FC9E126" width="600" height="600"
          className={styles['svg--accent']} style={{ right: "5vw", bottom: "-50vh" }} />
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

        <SpriteIcon id="circle-fill" fill="#E6D6FFAB" width="400" height="400"
          className={styles['svg--accent']} style={{ left: "0vw", top: "0vh" }} />
        <SpriteIcon id="circle-fill" fill="#E4507C" width="100" height="100"
          className={styles['svg--accent']} style={{ right: "20vw", top: "5vh" }} />
        <SpriteIcon id="vd-outline" stroke="#64DF8E" strokeWidth="4px" width="150" height="150"
          className={styles['svg--accent']} style={{ right: "10vw", bottom: "5vh", transform: "rotate(20deg)" }} />
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

        <SpriteIcon id="circle-outline" stroke="#FEAACE" strokeWidth="4px" width="100" height="100"
          className={styles['svg--accent']} style={{ left: "5vw", top: "10vh" }} />
        <SpriteIcon id="circle-outline" stroke="#438DCC" strokeWidth="4px" width="100" height="100"
          className={styles['svg--accent']} style={{ left: "40vw", bottom: "-10vh" }} />
        <SpriteIcon id="circle-fill" fill="#6E1F3F1A" width="500" height="500"
          className={styles['svg--accent']} style={{ right: "1vw", bottom: "-10vh" }} />
        <SpriteIcon id="circle-fill" fill="#AAD396" width="100" height="100"
          className={styles['svg--accent']} style={{ left: "-2vw", bottom: "-10vh" }} />

      </div>

      <div className={styles.section__newsletter}>
        <div className={styles.newsletter__previews}>
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
  const featuredPosts = await getGroupedPostsData({ group: 'collection', value: '6', input: allPostsData});
  
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