import { useEffect, useState } from "react";

import Link from "next/link";
import postStyles from "@/styles/posts.module.scss";
import Image from "next/image";

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
    document.querySelector('html').scrollIntoView({ behavior: 'smooth'});
    setPage(page + change);
  }

  function jumpToPage(pageNum) {
    
    document.querySelector('html').scrollIntoView({ behavior: 'smooth'});
    setPage(pageNum);
  }

  return (
    <>
      <div className={postStyles.genre__grid}>
        {genre.slice(offset, offset + limit)
          .map(({ slug, title, contributor, collection, tags, thumbnail }) => (
            <Link href={`/${slug}`} key={slug} className={postStyles.genre__post__link}>
              {(title.length > 30) ? (
                <h2 className={postStyles["title--small"]}>{title}</h2>
              ) : (
                <h2>{title}</h2>
              )}
              <p className={postStyles.genre__post__author}>{contributor.split(',')[0].replace(/\(.*\)/g, '')}</p>
            </Link>
          ))}


      </div>
      <div className={postStyles.genre__nav}>
        {page !== 0 && <button onClick={() => handlePageChange(-1)}>&lt;</button>}
        {
          pageArr.map((pageNum) => {
            return (
              <button key={pageNum} onClick={() => jumpToPage(pageNum)}>{pageNum+1}</button>
            )
          })
        }
        {page !== numPages - 1 && <button onClick={() => handlePageChange(1)}>&gt;</button>}
      </div>

    </>
  );
}