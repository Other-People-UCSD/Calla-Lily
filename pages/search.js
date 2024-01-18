import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import styles from "@/styles/searchPage.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/components/appContext";
import { getSortedPostsData } from '@/lib/posts';

export default function SearchPage() {

  return (
    <>
      <Layout post title={"Search"}>
        <h1>Search</h1>
        <SearchBar />

        <ul className={styles.results}>
        </ul>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}

function debounce(fn, time) {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
    }, time);
  }
}

const defaultSearchOptions = {
  'resultsPerPage': 10,
  'showFilter': false
}
function SearchBar() {
  const [metadata, setMetadata] = useState(null);
  const [searchOptions, setSearchOptions] = useState(defaultSearchOptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null)
  const [searchPage, setSearchPage] = useState(0);
  const searchFilterKeys = ["title", "contributor", "tags"];

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/api/post-metadata.json');
      const metadata = await res.json();
      setMetadata(metadata);
    })();
  }, [])


  function filterResults(recentSearchQuery) {
    if (metadata === 'undefined' || metadata === 'null') {
      return;
    }
    const matchingResults = Object.fromEntries(Object.entries(metadata).filter(([slug, data]) => {
      const conditions = searchFilterKeys.map(key => {
        return data[key]?.toString().toLowerCase()
          .includes(recentSearchQuery.toLowerCase())
      });

      return conditions.includes(true);
    }));

    const numSearchPages = Math.ceil(Object.keys(matchingResults).length / searchOptions.resultsPerPage);
    console.log(matchingResults)
    setSearchResults({
      numSearchPages: numSearchPages,
      matchingResults: matchingResults,
    });
  }

  // Must debounce like this to pass in the new value instead of using the old state
  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);

    debounce(() => {
      filterResults(e.target.value);
    }, 200)();
  }

  function handlePageChange(change) {
    if (searchPage + change < 0 || searchPage + change >= searchResults.numSearchPages) {
      return;
    }
    setSearchPage(searchPage + change);
  }

  function jumpToPage(pageNum) {
    setSearchPage(pageNum);
  }

  function handleFilter() {
    const newSearchOptions = { ...searchOptions, 'showFilter': !searchOptions.showFilter };
    console.log(newSearchOptions)
    setSearchOptions(newSearchOptions)
  }
  return (
    <>
      <SearchToolbar
        searchOptions={searchOptions}
        searchQuery={searchQuery}
        handleSearchQuery={handleSearchQuery}
        handleFilter={handleFilter}
      />

      {searchResults &&
        <SearchResults
          searchOptions={searchOptions}
          searchResults={searchResults}
          searchPage={searchPage}
          handlePageChange={handlePageChange}
          jumpToPage={jumpToPage} />
      }
    </>
  )
}

function SearchToolbar({ searchOptions, searchQuery, handleSearchQuery, handleFilter }) {
  const filterArrowIcon = searchOptions.showFilter ? <span>&#9650;</span> : <span>&#9660;</span>;

  return (
    <form action="/search" method="get" role="search">
      <div className={styles.toolbar__main}>
        <input
          type="search"
          name="q"
          value={searchQuery}
          onChange={e => handleSearchQuery(e)}
          placeholder="Search"
          aria-placeholder="Search for a work"
          autoComplete="search"
          className={styles.query__input} />
        {/* <button type="submit" className={styles.toolbar__submit}>Search</button> */}
      </div>
      <button
        type="button"
        onClick={handleFilter}
        className={styles.filter__button}>Filter {filterArrowIcon}</button>
      {searchOptions.showFilter &&
        <div className={styles.filter__container}>
          <label htmlFor="genre">Genre</label>
          <input type="checkbox" name="visualarts" />

          <label htmlFor="collection">Collection</label>
          <input type="select" name="collection" />
        </div>
      }
    </form>
  );

}

function SearchResults({ searchOptions, searchResults, searchPage, handlePageChange, jumpToPage }) {
  const results = searchResults.matchingResults;

  return (
    <div>
      <p>{Object.keys(results).length}</p>
      <ul aria-live="polite">
        {
          Object.keys(results).slice(searchPage * searchOptions.resultsPerPage, (searchPage + 1) * searchOptions.resultsPerPage).map((key) => {

            return <li key={key} className={styles.results__item}>
              <Link href={key}>
                <p>{results[key].title}</p>
                <p>{results[key].contributor}</p>
                {results[key].thumbnail &&
                  <Image src={results[key].thumbnail} width={100} height={100}
                    placeholder={"blur"} blurDataURL={results[key].thumbnail}
                    className={styles.results__thumbnail} />
                }
              </Link>
            </li>
          })
        }
      </ul>

      {searchPage !== 0 && <button onClick={() => handlePageChange(-1)}>&lt;</button>}
      {
        searchResults.numSearchPages > 1 &&
        [...Array(searchResults.numSearchPages).keys()].map((pageNum) => {
          return <button key={pageNum} onClick={() => jumpToPage(pageNum)}>{pageNum + 1}</button>
        })
      }
      {searchPage !== searchResults.numSearchPages - 1 && <button onClick={() => handlePageChange(1)}>&gt;</button>}
    </div>
  );

}