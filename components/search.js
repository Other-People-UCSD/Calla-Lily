import { useEffect, useState } from "react";
import styles from "@/styles/search.module.scss";
import Link from "next/link";
import { useAppContext } from "@/components/appContext";

export default function Search({ closeNav }) {
  const [searchQuery, setSearchQuery] = useState('');
  const context = useAppContext();
  const allPostsData = context.allPostsData;
  const recommender = context.recommender;

  const getSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  }

  // Auto focus the search bar when the menu is opened, 
  // But prevent the window from scrolling so top of header is still visible 
  useEffect(() => {
    document.getElementById('search-input').focus({ preventScroll: true });
  }, []);

  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        id="search-input"
        className={styles.input}
        placeholder="Search"
        aria-placeholder="Search for a work"
        // autoFocus={true}
        onChange={getSearchQuery} />
      {searchQuery === '' && recommender &&
        <p>Enjoyed this work? Here are our recommendations!</p>
      }
      <SearchResults
        closeNav={closeNav}
        searchQuery={searchQuery}
        allPostsData={allPostsData}
        recommender={recommender}
      />
    </div>
  );
}

const SearchResults = ({ closeNav, searchQuery, allPostsData, recommender }) => {
  const [displayLimit, setDisplayLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  if (searchQuery === '' && !recommender) {
    return;
  }

  const searchKeys = [
    "slug", "collection", "category", "title",
    "date", "contributor", "tags"
  ]

  let postsQuery = [];
  let results = [];

  if (searchQuery === '' && recommender) {
    const keyedPosts = [];
    allPostsData.map((post, idx) => {
      const key = `/${post.slug}`;
      keyedPosts[key] = `${idx}`;
    });

    postsQuery = recommender.map((slug) => {
      return keyedPosts[slug];
    });
  } else {
    postsQuery = Object.keys(allPostsData).filter(id => {
      const postData = allPostsData[id];
      const conditions = searchKeys.map(key => {
        return postData[key] ? (
          postData[key].toString().toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) : (
          false
        );
      });

      return conditions.includes(true);
    });
  }

  results = postsQuery.slice(offset, displayLimit);

  const numPages = Math.ceil(postsQuery.length / displayLimit);
  const pageArr = [...Array(numPages).keys()];

  function handleChangeOffset(mult) {
    setOffset(offset * mult)
  }

  function handleClick(e) {
    if (searchQuery === '' && recommender) {
      const link = e.target.parentElement;
      const toPath = link.getAttribute('href');

      gtag('event', 'click_recommendation', {
        'from': window.location.pathname,
        'to': toPath
      });
    }

    closeNav();
  }

  return (
    <ul className={styles.results}>
      {
        results.length > 0 ? (
          <>
            <div className={`${styles.results__grid} ${styles.results__header}`}>
              <p>Title</p>
              <p>Author</p>
              <p>Genre</p>
            </div>
            {results.map((key) => {
              const post = allPostsData[key];
              const author = post.contributor.split(',')[0].replace(/\(.*\)/g, '');
              return (
                <li key={key} className={styles.results__item}>
                  <Link href={`/${post.slug}`}
                    className={styles.results__grid}
                    onClick={handleClick}>
                    <p>{post.title}</p>
                    <p>{author}</p>
                    <p>{post.tags.join(", ")}</p>
                  </Link>
                </li>
              );
            })}
            {/* {postsQuery.length > displayLimit &&
              <button className={`text--heading_2 ${styles.view_more}`} onClick={handleViewMore}>View More</button>
            } */}
            <div className={styles.results__nav}>
              {<button onClick={() => handleChangeOffset(0)}>&lt;</button>}
              {
                pageArr.map((pageNum) => {
                  return (
                    <button key={pageNum} onClick={(pageNum) => handleChangeOffset(pageNum)}>{pageNum + 1}</button>
                  )
                })
              }
              {<button onClick={() => handleChangeOffset(1)}>&gt;</button>}
            </div>
          </>
        ) : (
          "No results found. Try searching by title, author, tags, or collection number/year!"
        )
      }
    </ul>
  );
}