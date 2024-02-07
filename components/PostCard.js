import { useEffect, useState, useMemo } from "react";

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


export function PostCardSelector({ entries }) {
  const [selector, setSelector] = useState({ 'genre': 'poetry', 'entries': entries.poetry });


  function handleSelector(genre_str) {
    setSelector({ 'genre': genre_str, 'entries': entries[genre_str] });
  }

  const children = useMemo(() =>
    <PostSelectorChild
      selector={selector}
      handleSelector={handleSelector} />, [selector]);

  return <>{children}</>
}

function PostSelectorChild({ selector, handleSelector = { handleSelector } }) {
  const selectorControlObj = {
    'poetry': 'Poetry',
    'fiction': 'Fiction',
    'nonfiction': 'Nonfiction',
    'visualarts': 'Visual Arts'
  }

  return (
    <div className={styles.selector__container}>
      <div className={styles.selector__wrapper}>
        <div className={styles.selector__controls}>
          {Object.entries(selectorControlObj).map(([genre_str, label]) => {
            const btnClassGenre = `${styles[`selector__button--${genre_str}`]}`;

            const isSelected = `${(genre_str === selector.genre) ? styles['selector__button--selected'] : ''}`;

            return <button
              key={label}
              className={`${styles.selector__button}  ${btnClassGenre} ${isSelected}`}
              onClick={() => handleSelector(genre_str)}>{label}</button>
          })
          }
        </div>
        <hr className={`${styles.selector__divider} ${styles[`divider--${selector.genre}`]}`} />
        <div className={styles.selector__grid__container}>
          {selector.entries.slice(0, 6).map((props, idx) => {
            return <PostCard key={idx} {...props} />
          })
          }
        </div>
      </div>
      <Link href={selector.genre} className={styles.selector__explore}><span>Explore the rest</span> -&gt;</Link>
    </div>
  )
}

export function PostCard({ slug, title, contributor, collection, thumbnail }) {
  // const [preview, setPreview] = useState('');

  // useEffect(() => {
  //   if (postCache.slug) {
  //     setPreview(postCache.slug.excerpt);
  //     return;
  //   }

  //   (async () => {
  //     const res = await fetch(`/api/post/${slug}`, {
  //       method: "get",
  //       headers: { "opm-content": "preview" }
  //     });
  //     const postData = await res.json();
  //     handleCache
  //     setPreview(postData.excerpt);
  //   })();
  //   return;
  // }, [slug])


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
        {/* <p className={styles.card__preview}>{preview}</p> */}
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