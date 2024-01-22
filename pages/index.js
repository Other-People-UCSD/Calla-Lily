import Image from 'next/image';
import styles from '@/styles/homepage.module.scss';
import CarouselGenre from '@/components/Carousel';
import Layout from '@/components/layout';
import client from '../tina/__generated__/client';
import { useTina } from 'tinacms/dist/react';
import { getSortedPostsData, getGenrePostsData } from '@/lib/posts';
import { PostCardGrid } from '../components/PostCard';


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


      <div className={`${styles.block} ${styles.collection__cover}`}>
        <div className={`${styles.block__text} ${styles.collection__title}`}>
          <p className={"text--heading_1"}>Spring 2023</p>
          <hr className={styles.collection__hr} />
          <p className={"text--heading_1"}>Collection</p>
          <p className={"text--heading_1"}> No. 6</p>
          <p className={"text--heading_1"}>LIMINAL</p>
        </div>
        <div className={styles.block__img__container} style={{ width: '500px' }}>
          <figure className={styles.block__img}>
            <Image className={`${styles.img__cover} ${styles["img__cover--right"]}`}
              src="/images/5/eclipse-cover-caroline-tjoe.webp" fill={true}
              sizes='1080px'
              alt="cover" />
            <figcaption className={styles.block__img__caption}>Eclipse Cover by Caroline Tjoe</figcaption>
          </figure>
        </div>
      </div>



      <div className={styles.genre__container}>
        <svg className={styles.svg__poetry}>
          <circle cx="400" cy="400" r="400" />
        </svg>
        <div className={styles.headline}>
          <h2 className={styles.headline__text}>Poetry</h2>
        </div>
        <hr className={styles.genre__hr} />
        <div className={styles.genre__content}>
          <PostCardGrid entries={props.poetry} />
          <div className={styles.genre__content__overlay}>
            Read More
          </div>
        </div>
      </div>


      <div className={`${styles.genre__container} ${styles['genre__container--right']}`}>
        {/* <svg className={styles.svg__visual}>
          <circle cx="350" cy="350" r="350" />
          <circle cx="550" cy="550" r="350" />
        </svg> */}
        <div className={`${styles.headline} ${styles['headline--right']}`}>
          <h2 className={`${styles.headline__text} ${styles['headline__text--right']}`}>Visual Arts</h2>
        </div>
        <hr className={`${styles.genre__hr} ${styles['genre__hr--right']}`} />
        <PostCardGrid entries={props.visualarts} />
      </div>

      <div className={`${styles.genre__container}`}>
        <svg className={styles.svg__fiction}>
          <circle cx="400" cy="400" r="400" />
        </svg>
        <div className={styles.headline}>
          <h2 className={styles.headline__text}>Fiction</h2>
        </div>
        <hr className={styles.genre__hr} />
        <div className={styles.genre__content}>
          <PostCardGrid entries={props.fiction} />
          <div className={styles.genre__content__overlay}>
            Read More
          </div>
        </div>

      </div>

      <div className={`${styles.genre__container} ${styles['genre__container--right']}`}>
        <div className={`${styles.headline} ${styles['headline--right']}`}>
          <h2 className={`${styles.headline__text} ${styles['headline__text--right']}`}>Nonfiction</h2>
        </div>
        <hr className={`${styles.genre__hr} ${styles['genre__hr--right']}`} />
        <PostCardGrid entries={props.nonfiction} />

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