import Head from 'next/head'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import client from '../tina/__generated__/client'
import animationStyles from "@/styles/animations.module.scss";
import postStyles from "@/styles/posts.module.scss";
import Layout from '@/components/layout';
import Link from 'next/link';
import { getPostDataAPI, getSortedPostsData } from '@/lib/posts';

const Page = (props) => {
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  function MinsRead() {
    const wc = props.fullPostData.wordCount;
    if (wc <= 360) {
      return "1 min reading time";
    }
    return `${Math.floor(wc / 180)} min reading time`;
  }

  // console.log('page data:', data.post.body.children[0].value)
  // console.log('page query', query);
  // console.log('page vars', variables);
  // console.log('page data', data);
  // console.log('page fullPostData', props.fullPostData);

  return (
    <Layout post title={data.post.title}>
      <div className={animationStyles.cssanimation}>
        <div className={postStyles["content-title"]}>
          <h1 className={postStyles.post_title}>{data.post.title}</h1>
        </div>
      </div>

      <h3>/ {data.post.contributor}</h3>
      <h4 className={postStyles.meta}>{data.post.tags.join(", ")} &mdash; <MinsRead /></h4>
      {data.post.featured ? (<h4 className={postStyles.gold}>No. {data.post.category}</h4>) : null}


      <article id="cr-article" className={postStyles["#cr-article"]}>
        <OPMHTML content={data.post.body.children} />
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

    </Layout>
  );
}

export default Page

export const getStaticProps = async ({ params }) => {
  let data = {}
  let query = {}
  let variables = { relativePath: `${params.slug}.mdx` }
  try {
    const res = await client.queries.post(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch {
    // swallow errors related to document creation
  }

  console.log('getStaticProps data:', data);
  // console.log('getStaticProps vars:', variables);
  const allPostData = getSortedPostsData();
  const fullPostData = await getPostDataAPI(params.slug, allPostData);
  // console.log('fullPostData', fullPostData);

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
      fullPostData: fullPostData,
    },
  }
}

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection()

  return {
    paths: postsListData.data.postConnection.edges.map((post) => (
      {
        params: { slug: post.node._sys.filename },
      })),
    fallback: false,
  }
}

/**
 * 
 * @param {[AST]} content An array of AST nodes from the rich text editor
 * @returns Parsed raw output from the rich text editor
 */
const OPMHTML = ({ content }) => {
  return content.map((astChild) => {
    // console.log(astChild, astChild.type)
    return (astChild.type === 'html') ? (
      <div dangerouslySetInnerHTML={{ __html: astChild.value }} />
    ) : (
      recurseAsHTML(astChild)
    )
  });
}

/**
 * 
 * @param {AST} ast Abstract Syntax Tree nodes from the rich text editor
 * @returns A <p> element of the HTML-md styled text one-level down.  
 */
const recurseAsHTML = (ast) => {
  let text = [];
  ast.children.map((child) => {
    child.type === 'html_inline' || child.type === 'html' ? (
      text.push(child.value)
    ) : (
      text.push(child.text)
    )
  });

  return <p dangerouslySetInnerHTML={{ __html: text.join('') }} />;
}