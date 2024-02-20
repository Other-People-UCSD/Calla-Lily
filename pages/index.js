import Image from 'next/image';
import styles from '@/styles/homepage.module.scss';
import Layout from '@/components/layout';
import client from '../tina/__generated__/client';
import { useTina } from 'tinacms/dist/react';
import { getSortedPostsData, getGenrePostsData } from '@/lib/posts';
import { PostCardSelector } from '../components/PostCard';
import { Randomizer } from '@/components/Randomizer';
import { NewsletterForm } from '@/components/footer';

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
          {/* <Image className={`${styles.hero__img__cover} ${styles["animate--rotate"]}`}
            src="opm-text-circle.svg" fill={true}
            alt="circle" /> */}

            <svg className={`${styles["animate--rotate"]}`}>
              <use href="svg/accents.svg#other-people-homepage-circle" />
            </svg>
        </div>
        <p className={`${styles.hero__text}`}>the visual and literary arts magazine</p>

        <AccentIcon id="circle-outline" stroke="#FBDA09" strokeWidth="4px" width="100" height="100" x="200px"
          className={styles['svg--accent']} style={{ left: "40vw", top: "20vh" }} />
        <AccentIcon id="circle-fill" fill="#FEAACE" width="100" height="100"
          className={styles['svg--accent']} style={{ left: "30vw", bottom: "100px" }} />
        <AccentIcon id="vd-outline" stroke="#DF7D64" strokeWidth="4px" width="150" height="150"
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

        <AccentIcon id="circle-fill" fill="#E7EFFB" width="300" height="300"
          className={styles['svg--accent']} style={{ left: "0", top: "0" }} />
        <AccentIcon id="circle-fill" fill="#3363431A" width="600" height="600"
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
        <Randomizer entries={props.allPostsData} group={6} numResults={4} />

        <AccentIcon id="circle-fill" fill="#C1665A" width="100" height="100"
          className={styles['svg--accent']} style={{ right: "5vw", top: "150px", }} />
        <AccentIcon id="circle-outline" stroke="#5DA04C" strokeWidth="4px" width="100" height="100"
          className={styles['svg--accent']} style={{ left: "10vh", bottom: "150px", }} />
        <AccentIcon id="circle-fill" fill="#9FC9E126" width="600" height="600"
          className={styles['svg--accent']} style={{ right: "-20vw", bottom: "-25vh", }} />
        <AccentIcon id="circle-fill" fill="#9FC9E126" width="600" height="600"
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

        <AccentIcon id="circle-fill" fill="#E6D6FFAB" width="400" height="400"
          className={styles['svg--accent']} style={{ left: "0vw", top: "0vh" }} />
        <AccentIcon id="circle-fill" fill="#E4507C" width="100" height="100"
          className={styles['svg--accent']} style={{ right: "20vw", top: "5vh" }} />
        <AccentIcon id="vd-outline" stroke="#64DF8E" strokeWidth="4px" width="150" height="150"
          className={styles['svg--accent']} style={{ right: "10vw", bottom: "5vh", transform: "rotate(20deg)" }} />
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

        <AccentIcon id="circle-outline" stroke="#FEAACE" strokeWidth="4px" width="100" height="100"
          className={styles['svg--accent']} style={{left: "5vw", top: "10vh" }}/>
        <AccentIcon id="circle-outline" stroke="#438DCC" strokeWidth="4px" width="100" height="100"
          className={styles['svg--accent']} style={{left: "40vw", bottom:"-10vh" }}/>
        <AccentIcon id="circle-fill" fill="#6E1F3F1A" width="500" height="500"
          className={styles['svg--accent']} style={{right: "1vw", bottom: "-10vh" }}/>
        <AccentIcon id="circle-fill" fill="#AAD396" width="100" height="100"
          className={styles['svg--accent']} style={{left: "-2vw", bottom: "-10vh" }}/>

      </div>

      <div className={styles.section__newsletter}>
        <NewsletterForm homepage />
        <AccentIcon id="vd-outline" stroke="#8464DF" strokeWidth="4px" width="150" height="150"
          className={styles['svg--accent']} style={{left: "30vw", bottom: "-100px", transform: "rotate(-45deg)"}}/>
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

  return <svg viewBox="0 0 89 64" width="89" height="64" xmlns="http://www.w3.org/2000/svg">
    <circle id="lcirc" cx="32" cy="32" r="25" stroke={themeColor} strokeWidth="3" fill="transparent" />
    <circle id="rcirc" cx="57" cy="32" r="25" stroke={themeColor} strokeWidth="3" fill="transparent" />

    <mask id="mask-intersect64" mask-mode="luminance">
      <circle cx="32" cy="32" r="25" fill="white" />
    </mask>

    <circle id="mask-intersect64" cx="57" cy="32" r="25" stroke={themeColor} strokeWidth="3" fill={themeColor}
      mask="url(#mask-intersect64)" />
  </svg>
}


export const AccentIcon = ({ id, className, ...props }) => {
  return <svg className={className} {...props}>
    <use href={`/svg/accents.svg#${id}`} />
  </svg>
}