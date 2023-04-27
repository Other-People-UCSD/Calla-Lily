import Layout from '@/components/layout';
import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';


export default function Home({ allPostsData }) {
  return (
    <Layout home title={"Home"}>
      <section>
        <ul >
          {allPostsData.map(({ slug, title, contributor, category, featured, tags }) => (
            <li key={slug}>
              <Link href={`/${slug}`}>{title}</Link>
              <br />
              {contributor}
              <br />
              {tags.join(", ")}
            </li>
          ))}
        </ul>
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