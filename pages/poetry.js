import Layout from "@/components/layout";
import styles from "@/styles/posts.module.scss";
import Link from "next/link";
import { getGenrePostsData, getSortedPostsData } from "@/lib/posts";
import Genre from "../components/genre";

export default function Poetry({ poetryPosts }) {
  const footerConfig = {
    'showGradient': false,
    'showMore': false,
    'showNewsletter': false,
  };

  return (
    <Layout landingPage footerConfig={footerConfig} title={"Poetry"} className={styles.genre__main}>
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
          className={`${styles.genre__header__link} ${styles.genre__header__arts}`}>Visual Arts</Link>
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
      allPostsData,
      poetryPosts,
    }
  }
}