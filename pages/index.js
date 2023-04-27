import Layout from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';


export default function Home({ allPostsData }) {
  return (
    <Layout home title={"Home"}>
      <section>
        
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}