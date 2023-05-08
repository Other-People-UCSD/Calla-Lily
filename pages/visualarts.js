import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import Genre from "../components/genre";
import { getSortedPostsData, getGenrePostsData } from "@/lib/posts";

export default function VisualArts({ artPosts }) {
  return (
    <Layout genre title={"Visual Arts"}>
      <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
        <div className={indexStyles.IndexContainer}>
          <h1 className={indexStyles["page-title"]}>Visual Arts</h1>
        </div>
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