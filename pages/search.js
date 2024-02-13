import Layout from "@/components/layout";
import { createContext, useContext, useEffect, useState } from "react";
import styles from "@/styles/searchPage.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";

export default function SearchPage() {
  return (
    <Layout landingPage title={"Search"}>
      <h1>Advanced Search</h1>
      <SearchProvider />
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
  'showFilter': false,
  'genres': [],
  'collections': [],
  'contentYears': [],
}

// For Header Search, pass the closeNav function to set the html overflow to scroll 
// after a SearchResult link is pressed
const SearchContext = createContext(null);

/**
 * Only fetch from the API on demand when the user opens the search bar.
 * Do not re-fetch on rerenders by checking if metadata has been set before.
 */
export function SearchProvider({ showSearch, closeNav, isHeader, theme }) {
  const [isLoading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    if (showSearch === false || metadata !== null) {
      return;
    }
    (async () => {
      const res = await fetch(`/api/post-metadata.json`, {
        method: "get",
        headers: { "opm-content": 'preview' }
      });
      const fetchedMetadata = await res.json();
      setMetadata(fetchedMetadata);
      setLoading(false);
    })();
  }, [showSearch, metadata]);

  if (showSearch === false) {
    return null;
  }

  return (
    <SearchContext.Provider value={closeNav}>
      <SearchBar metadata={metadata} isLoading={isLoading} isHeader={isHeader} theme={theme} />
    </SearchContext.Provider>
  )
}

export function SearchBar({ metadata, isLoading, isHeader, theme }) {
  const [searchOptions, setSearchOptions] = useState(defaultSearchOptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null)
  const [searchPage, setSearchPage] = useState(0);
  const searchFilterKeys = ["title", "contributor", "tags"];

  // /**
  //  * After initial loading of data into metadata state, display the results
  //  * @param {Object} Metadata
  //  */
  // useEffect(() => {
  //   filterResults(searchQuery, searchOptions)
  // });

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

  /**
   * Filter the matching query using the provided filter options
   * (GENRE) AND (COLLECTION OR CONTENT_YEAR)
   * COLLECTION and CONTENT_YEAR are mutually exclusive groups.
   * @param {Object} matchingQueryResults 
   * @param {Array.<Object>} recentSearchOptions 
   * @returns {Object} Filtered results
   */
  function filterOptions(matchingQueryResults, recentSearchOptions) {
    return Object.fromEntries(Object.entries(matchingQueryResults).filter(([_slug, data]) => {
      if (_slug === 'years' || _slug === 'collections') {
        return false;
      }

      // Array.<String> compare Array.<String> letter-case is not normalized
      const tagFilter = data['tags'].filter((tag) => {
        const lowerTag = tag.toLowerCase();
        for (const genre of recentSearchOptions['genres']) {
          // Differentiate Fiction and Nonfiction by checking start of tag
          // Some genres are 'Blackout Poetry' so match non-starting case
          if (lowerTag.indexOf(genre.toLowerCase()) === 0 ||
            (genre.toLowerCase() === 'poetry' && lowerTag.indexOf('poetry') !== -1)) {
            return true;
          }
        };
      });

      // Number compare Array.<Number>
      let collectionFilter = false; // recentSearchOptions['collections'].length === 0;
      for (const collection of recentSearchOptions['collections']) {
        if (collection === data['collection']) {
          collectionFilter = true;
          break;
        }
      }

      // Date compare Array.<Number>, convert Number and Number
      let contentFilter = false; // recentSearchOptions['contentYears'].length === 0;
      for (const year of recentSearchOptions['contentYears']) {
        const date = new Date(data.date);
        if (year === date.getFullYear() && !data.hasOwnProperty('collection')) {
          contentFilter = true;
          break;
        }
      }

      const genreIsFiltered = tagFilter.length > 0;
      const collectionIsFiltered = recentSearchOptions['collections'].length > 0;
      const yearIsFiltered = recentSearchOptions['contentYears'].length > 0;

      // Specific genre for collection or year:     genre AND (collection OR year)
      // All genres, selecting collection or years: !genre AND (collection OR year)
      // Everything or filter by genre only:        !collection and !year
      return (genreIsFiltered && ((collectionIsFiltered && collectionFilter) || (yearIsFiltered && contentFilter)))
        || (recentSearchOptions['genres'].length === 0 && ((collectionIsFiltered && collectionFilter) || (yearIsFiltered && contentFilter)))
        || (genreIsFiltered || recentSearchOptions['genres'].length === 0) && !collectionIsFiltered && !yearIsFiltered;
    }));
  }

  function filterResults(recentSearchQuery, recentSearchOptions) {
    if (metadata === 'undefined' || metadata === null) {
      return;
    }
    const matchingQueryResults = filterQuery(recentSearchQuery);

    const matchingFilter = filterOptions(matchingQueryResults, recentSearchOptions);

    console.log(matchingFilter)
    const numSearchPages = Math.ceil(Object.keys(matchingFilter).length / searchOptions.resultsPerPage);
    setSearchResults({
      numSearchPages: numSearchPages,
      results: matchingFilter,
    });
    setSearchPage(0); // Reset to first page on search change because there may not be as many results
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

  if (isLoading) {
    return <div className={`${isHeader ? styles.header : ''} ${theme ? styles[`theme--${theme}`] : ''}`}>
      <SearchToolbar
        metadata={metadata}
        searchOptions={searchOptions}
        searchQuery={searchQuery}
        handleSearchQuery={handleSearchQuery}
        handleFilter={handleFilter}
        handleFilterOptions={handleFilterOptions}
      />
      <p>Loading...</p>
    </div>
  }

  return (
    <div className={`${isHeader ? styles.header : ''} ${theme ? styles[`theme--${theme}`] : ''}`}>
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
          searchQuery={searchQuery}
          searchResults={searchResults}
          searchPage={searchPage}
          handlePageChange={handlePageChange}
          jumpToPage={jumpToPage} />
      }
    </div>
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
          className={styles.query__input}
          autoFocus />
        {/* <button type="submit" className={styles.toolbar__submit}>Search</button> */}
        <div className={styles.filter__dropdown}>
          <button
            type="button"
            onClick={handleFilter}
            className={styles.filter__button}>Filter {filterArrowIcon}</button>

          {searchOptions.showFilter && metadata &&
            <div className={styles.filter__container}>
              <fieldset className={`${styles.filter__container__group} ${styles.filter__container__genre}`}>
                <legend>Genre</legend>
                {["Poetry", "Visual Arts", "Fiction", "Nonfiction"].map((genre) => {
                  return <Chip key={genre} value={genre} group="genres" searchOptions={searchOptions} handleFilterOptions={handleFilterOptions} />
                })}
              </fieldset>

              <fieldset className={`${styles.filter__container__group} ${styles.filter__container__collection}`}>
                <legend>Collection</legend>
                {[...metadata?.collections].sort((a, b) => b - a).map((collection) => {
                  return <Chip key={collection} value={collection} group="collections" searchOptions={searchOptions} handleFilterOptions={handleFilterOptions} />
                })
                }
              </fieldset>

              <fieldset className={`${styles.filter__container__group} ${styles.filter__container__years}`}>
                <legend>Content Year</legend>
                {[...metadata?.years].sort((a, b) => b - a).map((year) => {
                  return <Chip key={year} value={year} group="contentYears" searchOptions={searchOptions} handleFilterOptions={handleFilterOptions} />
                })
                }
              </fieldset>
            </div>
          }
        </div>
      </div>

    </form>
  );
}

function Chip({ value, group, searchOptions, handleFilterOptions }) {
  function handleChip(group, val) {
    handleFilterOptions(group, val);
  }

  // Check if there are posts that have this result using the passed search options  
  // If no results disable chip
  const hasValidEntries = !true;

  const classes = `${styles.chip} ${(searchOptions[group]?.includes(value)) && styles['chip--selected']}`;

  return <button type="button"
    className={classes}
    disabled={hasValidEntries}
    name={group}
    value={value}
    onClick={() => handleChip(group, value)}>
    {group === "collections" ? `No. ${value}` : value}
  </button>
}

function SearchResults({ searchOptions, searchQuery, searchResults, searchPage, handlePageChange, jumpToPage }) {
  const closeNav = useContext(SearchContext);
  const results = searchResults.results;
  return (
    <div className={styles.results__container}>
      <p>Found {Object.keys(results).length} results.</p>
      <div className={`${styles.results__grid} ${styles.results__header}`}>
        <p>Title</p>
        <p className={styles.results__header__creator}>Creator(s)</p>
        <p className={styles.results__header__tag}>Genre</p>
      </div>
      <ul aria-live="polite">
        {
          Object.keys(results).slice(searchPage * searchOptions.resultsPerPage, (searchPage + 1) * searchOptions.resultsPerPage).map((key) => {
            const title = results[key].title;
            let contributor = results[key].contributor;
            // console.log(contributor)
            const excerpt = results[key].excerpt;
            const tags = results[key].tags.join(', ');

            return <li key={key} className={styles.results__item}>
              <Link href={key}
                onClick={closeNav}
                className={styles.results__grid}>
                <h3 className={styles.results__title}><MatchingText text={title} query={searchQuery} /></h3>
                <p className={styles.results__contributor}>
                  {contributor.split(',').map((creator) => {
                    return <span key={creator}>/ <MatchingText text={creator.replace(/\(.*\)/,'')} query={searchQuery} /></span>
                  })}
                </p>
                <p className={styles.results__tags}>
                  {tags.split(',').map((tag) => {
                    return <span key={tag}><MatchingText text={tag} query={searchQuery} /><br /></span>
                  })}
                </p>
                <div className={styles.results__contentrow}>
                  <p className={styles.results__excerpt}>{excerpt}</p>

                  {results[key].thumbnail &&
                  <div className={styles.results__thumbnail}>
                    <Image src={results[key].thumbnail}
                      placeholder={"blur"} blurDataURL={results[key].thumbnail}
                      quality={20}
                      fill={true}
                      sizes={"(min-width: 768px) 100px, 200px"}
                      alt={results[key].thumbnail} />
                      </div>
                  }
                </div>
              </Link>
            </li>
          })
        }
      </ul>

      <nav className={styles.nav}>
        {searchPage !== 0 && <button onClick={() => handlePageChange(-1)}>&lt;</button>}
        {
          searchResults.numSearchPages > 1 &&
          [...Array(searchResults.numSearchPages).keys()].map((pageNum) => {
            return <button key={pageNum} onClick={() => jumpToPage(pageNum)}>{pageNum + 1}</button>
          })
        }
        {searchResults.numSearchPages !== 0 && searchPage !== searchResults.numSearchPages - 1 && <button onClick={() => handlePageChange(1)}>&gt;</button>}
      </nav>

    </div>
  );

}

function MatchingText({ text, query }) {
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = (query === '') ? [text] : text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  const query_lower = query.toLowerCase();

  return (
    <>
      {parts.map((part, idx) => {
        if (part.toLowerCase() === query_lower) {
          return <span key={idx} className={styles["results__text--match"]}>{part}</span>
        }
        return <span key={idx}>{part}</span>
      })}
    </>
  )
}