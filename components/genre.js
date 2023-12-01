import Link from "next/link";
import postStyles from "@/styles/posts.module.scss";
import Image from "next/image";

export default function Genre({ genre, limit, offset }) {
  limit = limit || genre.length;
  offset = offset || 0;

  return (
    <div className={postStyles.genre__grid}>
      {genre.slice(offset, offset + limit)
        .map(({ slug, title, contributor, collection, tags, thumbnail }) => (
          <Link href={`/${slug}`} key={slug} className={postStyles.genre__post__link}>
            {(title.length > 30) ? (
              <h2 className={postStyles["title--small"]}>{title}</h2>
            ) : (
              <h2>{title}</h2>
            )}
            <p className={postStyles.genre__post__author}>{contributor.split(', ')[0]}</p>
          </Link>
        ))}
    </div>
  );
}