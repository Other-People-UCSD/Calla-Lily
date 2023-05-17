import { useTina } from 'tinacms/dist/react'
import client from '../tina/__generated__/client'
import animationStyles from "@/styles/animations.module.scss";
import postStyles from "@/styles/posts.module.scss";
import Layout from '@/components/layout';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { getSortedPostsData, getPostDataAPI } from '@/lib/posts';
import Script from 'next/script';
import { useEffect } from 'react';
import { pageChange } from '@/components/bgTheme';
import copyright from '@/components/copyright';
import ContentWarning from '@/components/ContentWarning';
import OPMHTML from '@/components/OPMHTML';

const Page = (props) => {
  // console.log(props.variables)
  // console.log(props.data)
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  // console.log('POST VAR', variables);
  // console.log('POST DATA', data);


  // Add JS files that affect all posts
  useEffect(() => {
    copyright();
    pageChange(data.post.theme);
  });

  // SEO-dependent variables for use in the next-seo plugin
  const excerpt = `${data.post.contributor} / ${props.fullPostData.excerpt.substring(0, Math.min(155, props.fullPostData.excerpt.length))}...`
  const slug = data.post.featured ? (data.post._sys.relativePath.replace(/.mdx?/, '')) : (data.post._sys.filename);
  const canonical = `https://otherpeoplesd.com/${slug}`;
  const previewImg = data.post.thumbnail ? data.post.thumbnail : `https://otherpeoplesd.com/favicons/favicon-32x32.png`;

  return (
    <Layout post title={data.post.title}>
      <NextSeo
        canonical={canonical}
        description={excerpt}
        excerpt={excerpt}
        openGraph={{
          type: 'article',
          images: [{ url: previewImg }],
        }}
      />
      <div className={animationStyles.cssanimation}>
        <div>
          <h1 id="post-title" className={postStyles.post_title}>{data.post.title}</h1>
        </div>
      </div>

      <h3>/ {data.post.contributor}</h3>
      <h4 className={postStyles.meta}>{data.post.tags.join(", ")} &mdash; <MinsRead wordCount={props.fullPostData.wordCount} /></h4>
      {data.post.collection ? (<h4 className={postStyles.gold}>No. {data.post.collection}</h4>) : null}
      <br />

      { data.post.contentWarning ? <ContentWarning description={data.post.contentWarning} /> : null }
      
      <article id="cr-article" className={postStyles["#cr-article"]}>
        <OPMHTML content={data.post.body.children} depth={0} />
      </article>

      <div className={postStyles["copyright-footer"]}>
        <h4>This work belongs to {data.post.contributor} © <br /> Copy, reproduction, and modification are not permitted without permission</h4>
      </div>

      <div className={postStyles["post-nav"]}>
        <div className={postStyles["post-nav-prev"]}>
          {props.fullPostData.prevPost ? (<h4><Link href={props.fullPostData.prevPost}>&lt;prev</Link></h4>) : null}
        </div>
        <div className={postStyles["post-nav-next"]}>
          {props.fullPostData.nextPost ? (<h4><Link href={props.fullPostData.nextPost}>next&gt;</Link></h4>) : null}
        </div>
      </div>

      <Experimental title={data.post.title} />
    </Layout>
  );
}

export default Page;

export const getStaticProps = async (params) => {
  const { data, query, variables } = await getPageData(params.params.slug);
  // console.log('getStaticProps data:', data);
  // console.log('getStaticProps vars:', variables);
  const allPostsData = getSortedPostsData();
  const fullPostData = await getPostDataAPI(variables.relativePath, allPostsData);
  // console.log('allPostData', allPostData);
  // console.log('fullPostData', fullPostData);

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
      fullPostData: fullPostData,
      allPostsData: allPostsData,
    },
  }
}

const getPageData = async (slug) => {
  // Sorted by frequency to reduce wrong path errors
  // const years = ['2020', '2022', '2023', '2021'];

  let query = {}
  let data = {}
  let variables = {}

  // if (slug.length === 1) {
  //   for (let i = 0, len = years.length; i < len; i++) {
  //     variables = { relativePath: `${years[i]}/${slug}.mdx` }
  //     try {
  //       const res = await client.queries.post(variables)
  //       query = res.query
  //       data = res.data
  //       variables = res.variables
  //       break;
  //     } catch {
  //       // swallow errors related to document creation
  //       console.log(variables, "does not exist");
  //     }
  //   }
  // } else {
  variables = { relativePath: `${slug.join('/')}.mdx` }
  try {
    const res = await client.queries.post(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch {
    // swallow errors related to document creation
  }
  // }

  return {
    data: data,
    query: query,
    variables: variables
  }
}

export const getStaticPaths = async () => {
  let paths = [];
  let postsListData = undefined;
  let pageInfo = { hasNextPage: true };
  let after = "";

  while (pageInfo.hasNextPage) {
    postsListData = await client.queries.postConnection({ after: after });
    pageInfo = postsListData.data.postConnection.pageInfo;
    after = pageInfo.endCursor;

    const edges = postsListData.data.postConnection.edges;

    for (let i = 0, len = edges.length; i < len; i++) {
      const post = edges[i];
      const route = post.node._sys.relativePath
        .replace(/\.mdx?/, '').split('/');
      // console.log(route)
      paths.push({ params: { slug: route, dir: route[0] } });
      // if (route[0].length === 4) {
      //   const dir = route.shift();
      //   // console.log(route)
      //   paths.push({ params: { slug: route, dir: dir } });
      // }
    }
  }
  // console.log('Number of dynamic pages:', paths.length);

  return {
    paths: paths,
    fallback: false,
  }
}

/**
 * 
 * @param {*} props 
 * @returns 
 */
export const Experimental = ({ title }) => {
  useEffect(() => {
    if (title === "missed connections (1 new post)") {
      try {
        document.querySelector('#post-title').remove();
        document.getElementById('cr-article').classList.add('monospace');
        document.getElementById('mc_embed_signup').innerHTML = '';
      } catch {

      }
    }
  });

  if (title === "missed connections (1 new post)") {
    return (
      <Script src={"/js/missed-connections.js"} />
    );
  }
}

/**
 * The estimated reading time calculation
 * @param {Number} param0 
 * @returns 
 */
export const MinsRead = ({wordCount}) => {
  if (wordCount <= 360) {
    return "1 min reading time";
  }
  return `${Math.floor(wordCount / 180)} min reading time`;
}

