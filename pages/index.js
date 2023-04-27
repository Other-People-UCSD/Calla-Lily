import Layout from '@/components/layout';
import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';


export default function Home({ allPostsData }) {
  // console.log(allPostsData)
  return (
    <Layout home title={"Home"}>
      <section>
        <ul >
          {allPostsData.map(({ params, title, contributor, category, featured, tags }) => (
            <li key={title}>
              <Link href={`/${params.join('/')}`}>{title}</Link>
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
  console.log('static props index', allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}