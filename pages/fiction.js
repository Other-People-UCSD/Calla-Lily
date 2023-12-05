import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import styles from "@/styles/posts.module.scss";
import Genre from "../components/genre";
import { getSortedPostsData, getGenrePostsData } from "@/lib/posts";
import Link from "next/link";

export default function Fiction({ fictionPosts }) {
  return (
    <Layout landingPage title={"Fiction"} className={styles.genre__main}>
      <div className={`${animationStyles.fadeInBottom} title__accent ${styles.genre__header__title}`}>
        <h1 className={`indexStyles.page__title text--heading_1 text__landing--heading_1`}>Fiction</h1>
        <p className={`text--heading_1 text__landing--heading_1 text__accent`} aria-hidden="true">Ficti<span class="text__accent--visible">o</span>n</p>
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
          className={`${styles.genre__header__link} ${styles.genre__header__arts}`}>Nonfiction</Link>
        <hr className={styles.genre__header__line} />
      </div>

      <div className={styles.genre__header__row}>
        <h1 className={`${styles.genre__header__link} ${styles.genre__header__nonfiction} ${styles.genre__header__selected}`}>Fiction</h1>
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