import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import styles from "@/styles/searchPage.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from '@/lib/posts';

export default function SearchPage() {
  return (
    <Layout post title={"Search"}>
      <h1>Advanced Search</h1>
      <SearchBar />
    </Layout>
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
  'showFilter': true,
  'genres': ['Poetry', 'Visual Arts', 'Fiction', 'Nonfiction'],
  'collections': [],
  'contentYears': [],
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
      const fetchedMetadata = await res.json();
      setMetadata(fetchedMetadata);
    })();
  }, [])

  function filterQuery(recentSearchQuery) {
    if (recentSearchQuery === undefined || recentSearchQuery === '') {
      return metadata;
    }
    return Object.fromEntries(Object.entries(metadata).filter(([_slug, data]) => {
      const conditions = searchFilterKeys.map(key => {
        return data[key]?.toString().toLowerCase()
          .includes(recentSearchQuery.toLowerCase())
      });

      return conditions.includes(true);
    }));
  }

  function filterOptions(matchingQueryResults, recentSearchOptions) {
    return Object.fromEntries(Object.entries(matchingQueryResults).filter(([_slug, data]) => {
      if (_slug === 'years' || _slug === 'collections') {
        return false;
      }
      const tagFilter = data['tags'].filter((tag) => {
        for (const genre of recentSearchOptions['genres']) {
          if (tag.toLowerCase().includes(genre.toLowerCase())) {
            return true;
          }
        };
      });

      let collectionFilter = false; // recentSearchOptions['collections'].length === 0;
      for (const collection of recentSearchOptions['collections']) {
        if (collection === data['collection']) {
          collectionFilter = true;
          break;
        }
      }

      let contentFilter = false; // recentSearchOptions['contentYears'].length === 0;
      for (const year of recentSearchOptions['contentYears']) {
        const date = new Date(data.date);
        if (year === date.getFullYear() && !data.hasOwnProperty('collection')) {
          contentFilter = true;
          break;
        }
      }

      return [tagFilter.length > 0, collectionFilter, contentFilter].includes(true);
    }));
  }

  function filterResults(recentSearchQuery, recentSearchOptions) {
    if (metadata === 'undefined' || metadata === null) {
      return;
    }
    const matchingQueryResults = filterQuery(recentSearchQuery);

    const matchingFilter = filterOptions(matchingQueryResults, recentSearchOptions);

    const numSearchPages = Math.ceil(Object.keys(matchingFilter).length / searchOptions.resultsPerPage);
    setSearchResults({
      numSearchPages: numSearchPages,
      results: matchingFilter,
    });
  }

  // Must debounce like this to pass in the new value instead of using the old state
  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);

    debounce(() => {
      filterResults(e.target.value, searchOptions);
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

  function handleFilterOptions(group, value) {
    const oldSearchOptionGroup = searchOptions[group];
    let newSearchOptions;
    if (oldSearchOptionGroup.includes(value)) {
      const filtered = oldSearchOptionGroup.filter((v) => { return v !== value; });
      newSearchOptions = {
        ...searchOptions,
        [group]: filtered
      };
    } else {
      newSearchOptions = { ...searchOptions, [group]: [...oldSearchOptionGroup, value] };
    }
    setSearchOptions(newSearchOptions);
    filterResults(searchQuery, newSearchOptions);
  }

  return (
    <>
      <SearchToolbar
        metadata={metadata}
        searchOptions={searchOptions}
        searchQuery={searchQuery}
        handleSearchQuery={handleSearchQuery}
        handleFilter={handleFilter}
        handleFilterOptions={handleFilterOptions}
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

function SearchToolbar({ metadata, searchOptions, searchQuery, handleSearchQuery, handleFilter, handleFilterOptions }) {
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
          <fieldset className={styles.filter__container__group}>
            <label htmlFor="genre">Genre</label>
            {["Poetry", "Visual Arts", "Fiction", "Nonfiction"].map((genre) => {
              return <Chip key={genre} value={genre} group="genres" searchOptions={searchOptions} handleFilterOptions={handleFilterOptions} />
            })}
          </fieldset>

          <fieldset className={styles.filter__container__group}>
            <label htmlFor="collection">Collection</label>
            {metadata?.collections.map((collection) => {
              return <Chip key={collection} value={collection} group="collections" searchOptions={searchOptions} handleFilterOptions={handleFilterOptions} />
            })
            }
          </fieldset>

          <fieldset className={styles.filter__container__group}>
            <label htmlFor="content_year">Content Writer (Year)</label>
            {metadata?.years.map((year) => {
              return <Chip key={year} value={year} group="contentYears" searchOptions={searchOptions} handleFilterOptions={handleFilterOptions} />
            })
            }
          </fieldset>
        </div>
      }
    </form>
  );

}

function Chip({ value, group, searchOptions, handleFilterOptions }) {
  function handleChip(group, val) {
    handleFilterOptions(group, val);
  }

  // Check if there are posts that have this result using the passed search options  
  // If no results disable chip
  const hasValidEntries = true;

  const classes = `${styles.chip} ${(searchOptions[group]?.includes(value)) && styles['chip--selected']}`;

  return <button type="button"
    className={classes}
    name={group}
    value={value}
    onClick={() => handleChip(group, value)}>
    {value}
  </button>
}

function SearchResults({ searchOptions, searchResults, searchPage, handlePageChange, jumpToPage }) {
  const results = searchResults.results;

  return (
    <div>
      <p>{Object.keys(results).length}</p>
      <ul aria-live="polite">
        {
          Object.keys(results).slice(searchPage * searchOptions.resultsPerPage, (searchPage + 1) * searchOptions.resultsPerPage).map((key) => {
            let title = results[key].title;
            let contributor = results[key].contributor;


            return <li key={key} className={styles.results__item}>
              <Link href={key}>
                <p>{results[key].title}</p>
                <p>{results[key].contributor}</p>
                {results[key].thumbnail &&
                  <Image src={results[key].thumbnail} width={100} height={100}
                    placeholder={"blur"} blurDataURL={results[key].thumbnail}
                    quality={20}
                    className={styles.results__thumbnail}
                    alt={results[key].thumbnail} />
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