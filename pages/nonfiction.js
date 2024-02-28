import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import styles from "@/styles/posts.module.scss";
import Link from "next/link";
import Genre from "../components/genre";
import { getSortedPostsData, getGenrePostsData } from "@/lib/posts";

export default function Nonfiction({ nonfictionPosts }) {
  const footerConfig = {
    'showGradient': false,
    'showMore': false,
    'showNewsletter': false,
  };
  
  return (
    <Layout landingPage footerConfig={footerConfig} title={"Nonfiction"} className={styles.genre__main}>
      <div className={`${animationStyles.fadeInBottom} title__accent ${styles.genre__header__title}`}>
        <h1 className={`text--heading_1 text__landing--heading_1`}>
          N<span className="text--shadow">o</span>nficti<span className="text--shadow">o</span>n</h1>
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
          className={`${styles.genre__header__link} ${styles.genre__header__arts}`}>Visual</Link>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={styles.genre__header__row}>
        <h1 className={`${styles.genre__header__link} ${styles.genre__header__nonfiction} ${styles["genre__header--selected"]}`}>Nonfiction</h1>
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
      nonfictionPosts
    }
  }
}