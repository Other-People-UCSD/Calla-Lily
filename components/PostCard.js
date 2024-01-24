import { useEffect, useState } from "react";

import Link from "next/link";
import styles from "@/styles/posts.module.scss";
import Image from "next/image";

export function PostCardGrid({ entries, limit, offset }) {
  limit = limit || 6;
  offset = offset || 0;

  return (
    <div className={styles.card__grid__container}>
      {entries.slice(offset, offset + limit).map((props, idx) => {
        return <PostCard key={idx} {...props} />
      })
      }
    </div>
  );
}
export function PostCard({ slug, title, contributor, collection, thumbnail }) {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/post/${slug}`, {
        method: "get",
        headers: { "opm-content": "preview" }
      });
      const postData = await res.json();
      setPreview(postData.excerpt);
    })();
    return
  }, [slug])


  return (
    <Link href={`/${slug}`} key={slug} className={styles.card__container}>
      <div className={styles.card__contentbox}>

        {(title.length > 30) ? (
          <h2 className={`${styles.card__title} ${styles["card__title--small"]}`}>{title}</h2>
        ) : (
          <h2 className={styles.card__title}>{title}</h2>
        )}
        <p className={styles.card__author}>/ {contributor.split(',')[0].replace(/\(.*\)/g, '')}</p>
        {collection ? <Chip value={collection} /> : <Chip value="Content" />}
        <p className={styles.card__preview}>{preview}</p>
      </div>

      {thumbnail &&
        <div className={styles.card__thumbnail__frame}>
          <Image src={thumbnail}
            fill={true} sizes="100px"

            placeholder="blur" blurDataURL={thumbnail}
            className={styles.card__thumbnail}
            alt={title} />
        </div>

      }
    </Link>
  );
}

function Chip({ value }) {
  if (value !== "Content") {
    value = `No. ${value}`;
  }
  return <div className={styles.card__chip}>
    {value}
  </div>
}