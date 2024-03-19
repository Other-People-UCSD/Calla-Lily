import { useEffect, useState } from "react";

import Link from "next/link";
import styles from "@/styles/posts.module.scss";
import Image from "next/image";
import { Chip } from "./PostCard";

export default function Genre({ genre, limit, offset }) {
  const [page, setPage] = useState(0);

  // The limit must be a common multiple of the number of columns in all viewport widths
  // This ensures that responsive styling is preserved without having empty grid cells
  // Except for the last page
  // Common Multiple = 2 (mid-size) * 3 (desktop) = 6
  limit = limit || 18;
  offset = offset || page * limit;

  const numPages = Math.ceil(genre.length / limit);
  const pageArr = [...Array(numPages).keys()];

  function handlePageChange(change) {
    if (page + change < 0 || page + change >= numPages) {
      return;
    }
    document.querySelector('html').scrollIntoView({ behavior: 'smooth' });
    setPage(page + change);
  }

  function jumpToPage(pageNum) {

    document.querySelector('html').scrollIntoView({ behavior: 'smooth' });
    setPage(pageNum);
  }

  return (
    <>
      <div className={styles.genre__grid}>
        {genre.slice(offset, offset + limit)
          .map(({ slug, title, contributor, collection, tags, thumbnail }) => (
            <Link href={`/${slug}`} key={slug} className={styles.genre__post__link}>
              <div className={styles.genre__post__contentbox}>
                {(title.length > 30) ? (
                  <h2 className={styles["title--small"]}>{title}</h2>
                ) : (
                  <h2 className={styles.genre__post__title}>{title}</h2>
                )}
                <p className={styles.genre__post__creator}>
                  {contributor.split(',').map(creator => <span key={creator}>/ {creator}</span>)}
                </p>
                <div className={styles.chip__wrapper}>
                  {collection ? <Chip type="collection" value={collection} /> : <Chip type="content" value="Content" />}
                  {tags.map((tag) => {
                    return <Chip key={tag} type="tag" value={tag} />
                  })}
                </div>
              </div>
              {thumbnail &&
                <div className={styles.card__thumbnail__frame}>
                  <Image src={thumbnail}
                    fill={true} sizes="100px"

                    placeholder="blur" blurDataURL={thumbnail}
                    className={styles.card__thumbnail}
                    alt="View artwork description in link!" />
                </div>
              }
            </Link>
          ))}
      </div>
      <div className={styles.genre__nav}>
        {page !== 0 && <button onClick={() => handlePageChange(-1)}>&lt;</button>}
        {
          pageArr.map((pageNum) => {
            return <button key={pageNum} onClick={() => jumpToPage(pageNum)}
              className={`${page === pageNum ? styles['genre__nav--selected'] : ''}`}>
              {pageNum + 1}
            </button>
          })
        }
        {page !== numPages - 1 && <button onClick={() => handlePageChange(1)}>&gt;</button>}
      </div>

    </>
  );
}