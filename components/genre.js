import Link from "next/link";
import postStyles from "@/styles/posts.module.scss";
import Image from "next/image";

export default function Genre({ genre, limit, offset }) {
  limit = limit || genre.length;
  offset = offset || 0;

  return (
    <div className={postStyles["post-container"]}>
      {genre.slice(offset, offset + limit)
        .map(({ slug, title, contributor, collection, tags, thumbnail }) => (
          <Link href={`/${slug}`} key={slug}>
            <div className={postStyles["post-info"]}>
              {(title.length > 30) ? (
                <h2 className={postStyles["small-title"]}>{title}</h2>
              ) : (
                <h2>{title}</h2>
              )}
              <div className={postStyles.thumb}>
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt={title}
                    fill={true}
                    sizes="width: 60px"
                    quality={25} />
                ) : (null)}
              </div>
              <div className={postStyles["card-info"]}>
                <h3> / <span>{contributor.split(', ').map((author) => (<span key={author}>{author} <br /></span>))}</span></h3>
                <h4>{tags.map((tag) => (<span key={tag}>{tag}<br /></span>))}</h4>
                {collection ? (<h4 style={{ color: "rgb(255, 153, 0)" }}>No. {collection}</h4>) : (null)}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}