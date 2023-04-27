import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import { getGenrePostsData } from "@/lib/genres";
import Genre from "../components/genre";

export default function Fiction({ fictionPosts }) {
  return (
    <Layout genre title={"Fiction"}>
      <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
        <div className={indexStyles.IndexContainer}>
          <h1 className={indexStyles["page-title"]}>Fiction</h1>
        </div>
      </div>

      <Genre genre={fictionPosts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const fictionPosts = getGenrePostsData('Fiction');
  return {
    props: {
      fictionPosts,
    }
  }
}