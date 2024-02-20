import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import styles from "@/styles/posts.module.scss";
import Genre from "../components/genre";
import { getSortedPostsData, getGenrePostsData } from "@/lib/posts";
import Link from "next/link";

export default function Fiction({ fictionPosts }) {
  const footerConfig = {
    'showGradient': false,
    'showMore': false,
    'showNewsletter': false,
  };

  return (
    <Layout landingPage footerConfig={footerConfig} title={"Fiction"} className={styles.genre__main}>
      <div className={`${animationStyles.fadeInBottom} title__accent ${styles.genre__header__title}`}>
        <h1 className={`text--heading_1 text__landing--heading_1`} aria-label="Fiction">
          Ficti<span className="text--shadow">o</span>n
        </h1>
      </div>

      <div className={styles.genre__header__row}>
        <Link href="/visualarts"
          className={`${styles.genre__header__link} ${styles.genre__header__arts}`}>Visual Arts</Link>
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
        <h1 className={`${styles.genre__header__link} ${styles.genre__header__fiction} ${styles.genre__header__selected}`}>Fiction</h1>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={styles.genre__selected__page}>
        <Genre genre={fictionPosts} />

      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  const fictionPosts = getGenrePostsData('Fiction', allPostsData);
  return {
    props: {
      allPostsData,
      fictionPosts,
    }
  }
}