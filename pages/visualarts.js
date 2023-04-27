import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import { getGenrePostsData } from "@/lib/genres";
import Genre from "../components/genre";

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
  const artPosts = getGenrePostsData('Visual Arts');
  return {
    props: {
      artPosts,
    }
  }
}