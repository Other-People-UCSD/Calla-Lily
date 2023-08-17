import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import { getGenrePostsData, getSortedPostsData } from "@/lib/posts";
import Genre from "../components/genre";

export default function Poetry({ poetryPosts }) {
  return (
    <Layout landingPage title={"Poetry"}>
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
  const allPostsData = getSortedPostsData();
  const poetryPosts = getGenrePostsData('Poetry', allPostsData);
  return {
    props: {
      allPostsData,
      poetryPosts,
    }
  }
}