import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import { getGenrePostsData } from "@/lib/genres";
import Genre from "../components/genre";

export default function Poetry({ poetryPosts }) {
  return (
    <Layout genre title={"Poetry"}>
      <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
        <div className={indexStyles.IndexContainer}>
          <h1 className={indexStyles["page-title"]}>Poetry</h1>
        </div>
      </div>

      <Genre genre={poetryPosts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const poetryPosts = getGenrePostsData('Poetry');
  return {
    props: {
      poetryPosts,
    }
  }
}