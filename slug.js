import Layout from "@/components/layout";
import postStyles from '@/styles/posts.module.scss';
import animationStyles from '@/styles/animations.module.scss';
import Link from "next/link";

export default function Post({ postData }) {
  function MinsRead() {
    const wc = postData.wordCount;
    if (wc <= 360) {
      return "1 min reading time";
    }
    return `${Math.floor(wc / 180)} min reading time`;
  }

  return (
    <>
      <Layout post title={postData.title}>
        <div className={animationStyles.cssanimation}>
          <div className={postStyles["content-title"]}>
            <h1 className={postStyles.post_title}>{postData.title}</h1>
          </div>
        </div>

        <h3>/ {postData.contributor}</h3>
        <h4 className={postStyles.meta}>{postData.tags.join(", ")} &mdash; <MinsRead /></h4>
        {postData.featured ? (<h4 className={postStyles.gold}>No. {postData.category}</h4>) : null}


        <article id="cr-article">
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
        </article>

        <div className={postStyles["copyright-footer"]}>
          <h4>This work belongs to {postData.contributor} © <br /> Copy, reproduction, and modification are not permitted without permission</h4>
        </div>

        <div className={postStyles["post-nav"]}>
          <div className={postStyles["post-nav-prev"]}>
            {postData.prevPost ? (<h4><Link href={postData.prevPost}>&lt;prev</Link></h4>) : null}
          </div>
          <div className={postStyles["post-nav-next"]}>
            {postData.nextPost ? (<h4><Link href={postData.nextPost}>next&gt;</Link></h4>) : null}
          </div>
        </div>
      </Layout>
    </>
  );
}


// export function getStaticPaths() {
//   const paths = getAllPostIds();

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const postData = await getPostDataAPI(params.slug, allPostsData);
//   return {
//     props: {
//       postData,
//     }
//   };
// }
