import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import { getGenrePostsData } from "@/lib/genres";
import Genre from "../components/genre";

export default function Nonfiction({ nonfictionPosts }) {
  return (
    <Layout genre title={"Nonfiction"}>
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
  const nonfictionPosts = getGenrePostsData('Nonfiction');
  return {
    props: {
      nonfictionPosts,
    }
  }
}