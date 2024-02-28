import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import styles from "@/styles/posts.module.scss";
import Link from "next/link";
import Genre from "../components/genre";
import { getGenrePostsData, getSortedPostsData } from "@/lib/posts";

export default function Poetry({ poetryPosts }) {
  const footerConfig = {
    'showGradient': false,
    'showMore': false,
    'showNewsletter': false,
  };

  return (
    <Layout landingPage footerConfig={footerConfig} title={"Poetry"} className={styles.genre__main}>
      <div className={`${animationStyles.fadeInBottom} title__accent ${styles.genre__header__title}`}>
        <h1 className={`text--heading_1 text__landing--heading_1`}>
          P<span className="text--shadow">o</span>etry</h1>
      </div>

      <div className={styles.genre__header__row}>
        <Link href="/fiction"
          className={`${styles.genre__header__link} ${styles.genre__header__fiction}`}>Fiction</Link>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={styles.genre__header__row}>
        <Link href="/nonfiction"
          className={`${styles.genre__header__link} ${styles.genre__header__nonfiction}`}>Nonfiction</Link>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={styles.genre__header__row}>
        <Link href="/visualarts"
          className={`${styles.genre__header__link} ${styles.genre__header__arts}`}>Visual</Link>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={styles.genre__header__row}>
        <h1 className={`${styles.genre__header__link} ${styles.genre__header__poetry} ${styles["genre__header--selected"]}`}>Poetry</h1>
        <hr className={styles.genre__header__line} />
      </div>

      <Genre genre={poetryPosts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const poetryPosts = getGenrePostsData('Poetry', allPostsData);
  return {
    props: {
      poetryPosts
    }
  }
}