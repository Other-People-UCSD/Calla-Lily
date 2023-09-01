import { useEffect } from 'react';
import { useTina } from 'tinacms/dist/react'
import client from '../tina/__generated__/client'
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Script from 'next/script';
import animationStyles from "@/styles/animations.module.scss";
import postStyles from "@/styles/posts.module.scss";
import Layout from '@/components/layout';
import { getSortedPostsData, getPostDataAPI } from '@/lib/posts';
import ContentWarning from '@/components/ContentWarning';
import { pageChange } from '@/lib/bgTheme';
import copyright from '@/lib/copyright';
import OPMparser from '@/lib/OPMparser';
import { beginMissedConnections } from '@/public/js/missed-connections';
import { beginCYOAStory, goto, parseString, resetCYOAProgress } from '@/public/js/cyoa';

import recommenderData from '@/data/recommender.json';
import Head from 'next/head';

const Page = (props) => {
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  // console.log('POST VAR', props.variables);
  // console.log('POST DATA', variables);

  // Add JS files that affect all posts
  useEffect(() => {
    copyright();
    pageChange(data.post.theme);
  }); // Does not trigger once to ensure copyright effect works

  // SEO-dependent variables for use in the next-seo plugin
  const excerpt = `${data.post.contributor} / ${props.fullPostData.excerpt.substring(0, Math.min(155, props.fullPostData.excerpt.length))}...`
  const slug = data.post.featured ? (data.post._sys.relativePath.replace(/.mdx?/, '')) : (data.post._sys.filename);
  const canonical = `https://otherpeoplesd.com/${slug}`;
  const previewImg = data.post.thumbnail ? data.post.thumbnail : `https://otherpeoplesd.com/favicons/favicon-32x32.png`;
  return (
    <Layout post title={data.post.title}>
      <Head>
        <meta name="robots" content="all"/>
        <meta name="robots" content="noimageindex"/>
      </Head>
      <NextSeo
        canonical={canonical}
        description={excerpt}
        excerpt={excerpt}
        openGraph={{
          type: 'article',
          images: [{ url: previewImg }],
        }}
      />
      <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
        <h1 id="post-title" className={postStyles.post_title}>{data.post.title}</h1>
      </div>

      <h3>/ {data.post.contributor}</h3>
      <h4 className={postStyles.meta}>{data.post.tags.join(", ")} &mdash; <MinsRead wordCount={props.fullPostData.manualWC ? props.fullPostData.manualWC : props.fullPostData.wordCount} /></h4>
      {data.post.collection ? (<h4 className={postStyles.gold}>No. {data.post.collection}</h4>) : null}

      {data.post.contentWarning ? <ContentWarning description={data.post.contentWarning} /> : null}

      <article id="cr-article" className={postStyles["cr-article"]}>
        <OPMparser content={data.post.body.children} depth={0} />
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

/**
 * Gets necessary information to render the page properly. 
 * Include additional static features here such as anything that affects the search functionality.
 * @param {Object} params Page parameters
 * @returns {Object} Props for the Next.js SSG
 */
export const getStaticProps = async (params) => {
  const { data, query, variables } = await getPageData(params.params.slug);
  const allPostsData = getSortedPostsData();
  const fullPostData = await getPostDataAPI(variables.relativePath, allPostsData);
  
  // Recommendation Data
  const relativePath = '/' + variables.relativePath.replace(/\.mdx?/, '');
  const recommendedPosts = recommenderData[relativePath] || null;

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
      fullPostData: fullPostData,
      allPostsData: allPostsData,
      recommender: recommendedPosts
    },
  }
}

/**
 * 
 * @param {Array} slug The URL separated by its route slashes 
 * @returns {Object} Page data
 */
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

/**
 * Get all post paths in a paginated form through the GraphQL API
 * @returns {Object} Paths for Next.js SSG
 */
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
 * @param {String} title The title of the experiemental work
 * @returns Javascript to run the experimental work property
 */
export const Experimental = ({ title }) => {
  // console.log(loaded, localStorage.getItem('loaded'))
  useEffect(() => {
    switch (title) {
      case "Kalbelia":
        try {
          document.getElementById("folksong").volume = 0.05;
          if (window.innerWidth <= 768) {
            const note = document.getElementById('note');
            note.innerHTML += '<br /><strong>For the best viewing experience, we suggest using a larger display.</strong>';
          }
        } catch {
        }
        break;
      default:
        break;
    }
  });

  switch (title) {
    case "missed connections (1 new post)":
      return <Script type='module'
        src={"/js/missed-connections.js"}
        onReady={() => {
          document.querySelector('#post-title').remove();
          document.getElementById('cr-article').classList.add('monospace');
          document.getElementById('mc_embed_signup').innerHTML = '';
          document.getElementById('mc-begin').addEventListener('click', beginMissedConnections);
          // console.log('missed connections');
        }}
      />
    case "You Have Created an Imaginary Friend":
      /**
       * When the page's DOM is loaded, this function will get the name of the JSON file by first looking 
       * up the textual value of 'post-src' and making a relative URL reference to it with .json appended 
       * to the end.
       */
      return <Script type="module"
        src={'/js/cyoa.js'}
        onReady={() => {
          try {
            const storyRef = document.getElementById('story-ref');
            if (!storyRef) {
              alert('Error! The story-ref block is not defined!');
            }

            const title = parseString(storyRef.innerText);
            const storyReference = "/js/" + title + ".json";

            if (document.getElementById('output-text').children.length === 0 || document.getElementById('9.0') === null) {
              beginCYOAStory(storyReference);
            }

            document.getElementById('resetCYOA').addEventListener('click', () => {
              resetCYOAProgress();
            });

            const shortcut = () => {
              document.getElementById('output-text').innerHTML = '';
              goto(1, parseInt(document.getElementById('shortcut').value));
            }

            document.getElementById('shortcut').addEventListener("keydown", (e) => {
              if (e.code === "Enter") {
                shortcut()
              }
            });
          } catch {
            // Prevent code execution on other pages
          }
        }}
      />
    default:
      break;
  }
}
/**
 * The estimated reading time calculation
 * @param {Number} wordCount The number of words in the page 
 * @returns {String} The estimated reading time 
 */
export const MinsRead = ({ wordCount }) => {
  if (wordCount <= 360) {
    return "1 min reading time";
  }
  return `${Math.floor(wordCount / 180)} min reading time`;
}

