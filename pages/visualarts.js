import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import Genre from "../components/genre";
import { getSortedPostsData, getGenrePostsData } from "@/lib/posts";

export default function VisualArts({ artPosts }) {
  return (
    <Layout landingPage title={"Visual Arts"}>
      <div className={`${animationStyles.fadeInBottom}`}>
        <h1 className={indexStyles.page__title}>Visual Arts</h1>
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