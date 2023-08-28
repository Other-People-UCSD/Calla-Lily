import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import { getSortedPostsData, getGenrePostsData } from "@/lib/posts";
import Genre from "../components/genre";

export default function Nonfiction({ nonfictionPosts }) {
  return (
    <Layout landingPage title={"Nonfiction"}>
      <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
        <div className={indexStyles.IndexContainer}>
          <h1 className={indexStyles["page-title"]}>Nonfiction</h1>
        </div>
      </div>

      <Genre genre={nonfictionPosts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const nonfictionPosts = getGenrePostsData('Nonfiction', allPostsData);
  return {
    props: {
      nonfictionPosts,
      allPostsData,
    }
  }
}