import { useTina } from 'tinacms/dist/react'
import client from '@/tina/__generated__/client'
import animationStyles from "@/styles/animations.module.scss";
import postStyles from "@/styles/posts.module.scss";
import Layout from '@/components/layout';
import OPMparser from '@/lib/OPMparser';

const Documentation = (props) => {
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout post title={data.docs.title}>
      <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
          <h1 id="post-title" className={postStyles.post_title}>{data.docs.title}</h1>
      </div>

      <h3>/ {data.docs.contributor}</h3>

      <article className={`${postStyles.docs}`}>
        <OPMparser content={data.docs.body.children} depth={0} />
      </article>

      <div className={postStyles["copyright-footer"]}>
        <h4>This work belongs to {data.docs.contributor} © <br /> Copy, reproduction, and modification are not permitted without permission</h4>
      </div>
    </Layout>
  );
}

export default Documentation;

export const getStaticProps = async (params) => {
  const { data, query, variables } = await getPageData(params.params.slug);

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
    },
  }
}

const getPageData = async (slug) => {
  let query = {}
  let data = {}
  let variables = {}

  variables = { relativePath: `${slug}.mdx` }
  try {
    const res = await client.queries.docs(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch {
    // swallow errors related to document creation
  }

  return {
    data: data,
    query: query,
    variables: variables
  }
}

export const getStaticPaths = async () => {
  let paths = [];
  let docsListData = undefined;
  let pageInfo = { hasNextPage: true };
  let after = "";

  while (pageInfo.hasNextPage) {
    docsListData = await client.queries.docsConnection({ after: after });
    pageInfo = docsListData.data.docsConnection.pageInfo;
    after = pageInfo.endCursor;
    const edges = docsListData.data.docsConnection.edges;

    for (let i = 0, len = edges.length; i < len; i++) {
      const post = edges[i];
      const route = post.node._sys.filename;
      paths.push({ params: { slug: route} });
    }
  }

  return {
    paths: paths,
    fallback: false,
  }
}