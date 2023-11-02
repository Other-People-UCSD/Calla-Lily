import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import Genre from "../components/genre";
import { getSortedPostsData, getGenrePostsData } from "@/lib/posts";

export default function Fiction({ fictionPosts }) {
  return (
    <Layout landingPage title={"Fiction"}>
      <div className={`${animationStyles.fadeInBottom}`}>
          <h1 className={indexStyles.page__title}>Fiction</h1>
      </div>

      <Genre genre={fictionPosts} />
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