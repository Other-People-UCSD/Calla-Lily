import Layout from "@/components/layout";
import { getSortedPostsData } from "@/lib/posts";

export default function Custom404() {
  return (
    <>
      <Layout post title={"404 Page Not Found"}>
        <h1>404 - Page Not Found</h1>
        <p>If you are experiencing any issues with finding posts in the new website,
          please email us about the problem so that we can fix it!</p>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}