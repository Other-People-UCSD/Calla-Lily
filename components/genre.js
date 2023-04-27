import Link from "next/link";
import postStyles from "@/styles/posts.module.scss";
import Image from "next/image";

export default function Genre({ genre }) {
  return (
    <div className={postStyles["post-container"]}>
      {genre.map(({ slug, title, contributor, category, featured, tags, thumb }) => (
        <Link href={`/${slug}`} key={slug}>
          <div className={postStyles.posts}>
            <div className={postStyles["post-info"]}>
              {(title.length > 30) ? (
                <h2 className={postStyles["small-title"]}>{title}</h2>
              ) : (
                <h2>{title}</h2>
              )}
              <div>
                {thumb ? (
                  <Image src={`/assets/thumbs/${thumb}`} width={80} height={80} alt={"x"} />
                ) : (null)}
              </div>
              <div className={postStyles["card-info"]}>
                <h3> / <span>{contributor.split(', ').map((author) => (<span key={author}>{author} <br /></span>))}</span></h3>
                <h4>{tags.map((tag) => (<span key={tag}>{tag}<br /></span>))}</h4>
                {featured ? (<h4 style={{ color: "rgb(255, 153, 0)" }}>No. {category}</h4>) : (null)}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}