import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import styles from "@/styles/posts.module.scss";
import Link from "next/link";
import Genre from "../components/genre";
import { getSortedPostsData, getGenrePostsData } from "@/lib/posts";

export default function VisualArts({ artPosts }) {
  const footerConfig = {
    'showGradient': false,
    'showMore': false,
    'showNewsletter': false,
  };

  return (
    <Layout landingPage footerConfig={footerConfig} title={"Visual Arts"} className={styles.genre__main}>
      <div className={`${animationStyles.fadeInBottom} title__accent ${styles.genre__header__title}`}>
        <h1 className={`indexStyles.page__title text--heading_1 text__landing--heading_1`}>Visual Arts</h1>
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
        <Link href="/nonfiction"
          className={`${styles.genre__header__link} ${styles.genre__header__nonfiction}`}>Nonfiction</Link>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={styles.genre__header__row}>
        <h1 className={`${styles.genre__header__link} ${styles.genre__header__arts} ${styles["genre__header--selected"]}`}>Visual</h1>
        <hr className={styles.genre__header__line} />
      </div>

      <Genre genre={artPosts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const artPosts = getGenrePostsData('Visual Arts', allPostsData);
  return {
    props: {
      artPosts
    }
  }
}