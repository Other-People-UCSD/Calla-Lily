import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import styles from "@/styles/posts.module.scss";
import { getSortedPostsData, getGenrePostsData } from "@/lib/posts";
import Genre from "../components/genre";
import Link from "next/link";

export default function Nonfiction({ nonfictionPosts }) {
  const footerConfig = {
    'showGradient': true,
    'showMore': false,
  };
  
  return (
    <Layout landingPage footerConfig={footerConfig} title={"Nonfiction"} className={styles.genre__main}>

      <div className={`${animationStyles.fadeInBottom} title__accent ${styles.genre__header__title}`}>
        <h1 className={`indexStyles.page__title text--heading_1 text__landing--heading_1`}>Nonfiction</h1>
        <p className={`text--heading_1 text__landing--heading_1 text__accent`} aria-hidden="true">N<span class="text__accent--visible">o</span>nficti<span class="text__accent--visible">o</span>n</p>
      </div>
      <div className={styles.genre__header__row}>
        <Link href="/fiction"
          className={`${styles.genre__header__link} ${styles.genre__header__fiction}`}>Fiction</Link>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={styles.genre__header__row}>
        <Link href="/poetry"
          className={`${styles.genre__header__link} ${styles.genre__header__poetry}`}>Poetry</Link>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={styles.genre__header__row}>
        <Link href="/visualarts"
          className={`${styles.genre__header__link} ${styles.genre__header__arts}`}>Visual Arts</Link>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={styles.genre__header__row}>
        <h1 className={`${styles.genre__header__link} ${styles.genre__header__nonfiction}`}>Nonfiction</h1>
        <hr className={styles.genre__header__line} />
      </div>



      <Genre genre={nonfictionPosts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const nonfictionPosts = getGenrePostsData('Nonfiction', allPostsData);
  return {
    props: {
      nonfictionPosts,
      allPostsData,
    }
  }
}