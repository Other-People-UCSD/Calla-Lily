import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import styles from "@/styles/posts.module.scss";
import Genre from "../components/genre";
import { getSortedPostsData, getGenrePostsData } from "@/lib/posts";
import Link from "next/link";

export default function VisualArts({ artPosts }) {
  return (
    <Layout landingPage title={"Visual Arts"} className={styles.genre__main}>
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
          className={`${styles.genre__header__link} ${styles.genre__header__arts}`}>Nonfiction</Link>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={styles.genre__header__row}>
        <h1 className={`${styles.genre__header__link} ${styles.genre__header__nonfiction} ${styles.genre__header__selected}`}>Visual Arts</h1>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={`${animationStyles.fadeInBottom} title__accent ${styles.genre__header__title}`}>
        <h1 className={`indexStyles.page__title text--heading_1 text__landing--heading_1`}>Visual Arts</h1>
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
      allPostsData,
      artPosts,
    }
  }
}