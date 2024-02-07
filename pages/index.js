import Image from 'next/image';
import styles from '@/styles/homepage.module.scss';
import Layout from '@/components/layout';
import client from '../tina/__generated__/client';
import { useTina } from 'tinacms/dist/react';
import { getSortedPostsData, getGenrePostsData } from '@/lib/posts';
import { PostCardSelector } from '../components/PostCard';
import { Randomizer } from '@/components/Randomizer';

export default function Home(props) {
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout homepage className={`${styles.main}`}>
      <div className={styles.hero}>
        <div className={`${styles.hero__img__container}`}>
          <Image className={`${styles.hero__img__cover} ${styles["animate--rotate"]}`}
            src="opm-text-circle.svg" fill={true}
            alt="circle" />
        </div>
        <p className={`${styles.hero__text}`}>the visual and literary arts magazine</p>
      </div>

      <div className={`${styles.collection__block} ${styles.collection__cover}`}>
        
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
        <Randomizer entries={props.allPostsData} group={6} numResults={4} />
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
            <span>Discover {props.allPostsData.length} publications!</span>
            <span>Our latest posts...</span>
            <span>Discover {props.allPostsData.length} publications!</span>
          </div>
        </div>
        <PostCardSelector entries={{
          poetry: props.poetry,
          fiction: props.fiction,
          nonfiction: props.nonfiction,
          visualarts: props.visualarts
        }} />
      </div>
    </Layout>
  )
}


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


const Logo256 = () => {
  return <svg viewBox="0 0 356 256" width="400" height="256" xmlns="http://www.w3.org/2000/svg" className={styles.logo}>
    <circle id="lcirc" cx="128" cy="128" r="100" stroke="black" strokeWidth="5" fill="transparent" />
    <circle id="rcirc" cx="228" cy="128" r="100" stroke="black" strokeWidth="5" fill="transparent" />

    <mask id="mask-intersect256" maskMode="luminance">
      <circle cx="128" cy="128" r="100" fill="white" />
    </mask>

    <circle id="intersect" cx="228" cy="128" r="100" stroke="black" strokeWidth="5" fill="black"
      mask="url(#mask-intersect256)" />
  </svg>
}

const Logo128 = () => {
  return <svg viewBox="0 0 178 128" width="178" height="128" xmlns="http://www.w3.org/2000/svg" className={styles.logo}>
    <circle id="lcirc" cx="64" cy="64" r="50" stroke="black" strokeWidth="5" fill="transparent" />
    <circle id="rcirc" cx="114" cy="64" r="50" stroke="black" strokeWidth="5" fill="transparent" />

    <mask id="mask-intersect128" mask-mode="luminance">
      <circle cx="64" cy="64" r="50" fill="white" />
    </mask>

    <circle id="intersect" cx="114" cy="64" r="50" stroke="black" strokeWidth="5" fill="black"
      mask="url(#mask-intersect128)" />
  </svg>
}

export const Logo64 = ({ theme }) => {
  const themeColor = theme === 'dark' ? 'white' : 'black';

  return <svg viewBox="0 0 89 64" width="89" height="64" xmlns="http://www.w3.org/2000/svg" className={styles.logo}>
    <circle id="lcirc" cx="32" cy="32" r="25" stroke={themeColor} strokeWidth="3" fill="transparent" />
    <circle id="rcirc" cx="57" cy="32" r="25" stroke={themeColor} strokeWidth="3" fill="transparent" />

    <mask id="mask-intersect64" mask-mode="luminance">
      <circle cx="32" cy="32" r="25" fill="white" />
    </mask>

    <circle id="intersect" cx="57" cy="32" r="25" stroke={themeColor} strokeWidth="3" fill={themeColor}
      mask="url(#mask-intersect64)" />
  </svg>
}