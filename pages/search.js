import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import styles from "@/styles/searchPage.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getSearchPageData } from "@/lib/posts";
import { useRouter } from "next/router";

const defaultSearchOptions = {
  'resultsPerPage': 10,
  'showFilter': false,
  'genres': [],
  'collections': [],
  'contentYears': [],
  'q': ''
}

export default function SearchPage({ searchData }) {
  const router = useRouter();
  const { metadata, allPostsData } = searchData;
  const [initData, setInitData] = useState(defaultSearchOptions);
  const initSearchPages = Math.ceil(Object.keys(allPostsData).length / initData.resultsPerPage);

  /**
   * Sanitize the query parameters to only load in the valid keys.
   * @param {ParsedUrlQuery|URLSearchParams} queryParams An object of search query parameters
   */
  const handleInitData = (queryParams) => {
    const copyData = { ...defaultSearchOptions };

    for (const [key, val] of Object.entries(queryParams)) {
      if (key === 'q') {
        copyData[key] = val;
        continue;
      } else if (['genres', 'collections', 'contentYears'].includes(key)) {
        copyData[key] = val.split(',');
      }
    }

    setInitData(copyData);
  }

  useEffect(() => {
    // Use Next Router, else if visited by a shared URL parse the entries
    if (Object.keys(router.query).length !== 0) {
      handleInitData(router.query, 'router');
    } else {
      // Validate the URL to prevent URL XSS injection
      const loadedURL = new URL(window.location.href);
      const params = new URLSearchParams(loadedURL.search);
      handleInitData(params);
    }
  }, [router.query]);

  return (
    <Layout landingPage title={"Search"}>
      <h1>Advanced Search</h1>
      <SearchBar metadata={metadata} allPostsData={allPostsData} initSearchPages={initSearchPages} initData={initData} router={router} />
    </Layout>
  );
}

export async function getStaticProps() {
  const searchData = await getSearchPageData();

  return {
    props: {
      searchData
    }
  }
}

/** 
 * Simple debounce function to delay operations on user typing query into search input
 * @returns {Function} The debounced function
 */
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

/**
 * 
 * @param {Object} metadata Information about the unique set of years and collections
 * @param {Object} allPostsData The data of all posts to be searched by
 * @param {Number} initSearchPages The number of pages in total
 * @returns SearchToolbar and SearchResults components
 */
export function SearchBar({ metadata, allPostsData, initSearchPages, initData, router }) {
  const [isInitialURL, setInitialURL] = useState(true);
  const [searchOptions, setSearchOptions] = useState(initData);
  const [searchQuery, setSearchQuery] = useState(initData.q || '');
  const [searchResults, setSearchResults] = useState({
    numSearchPages: initSearchPages,
    results: allPostsData,
  });
  const [searchPage, setSearchPage] = useState(0);
  const searchFilterKeys = ["title", "contributor", "tags"];

  if (isInitialURL) {
    filterResults(searchQuery, searchOptions);
    setInitialURL(false);
    return;
  }

  /**
   * Filters the entire initial data by user query
   * @param {String} recentSearchQuery The user search query (debounced) 
   * @returns {Object} Filtered data from allPostsData matching user query
   */
  function filterQuery(recentSearchQuery) {
    // No query, filter based on all data
    if (recentSearchQuery === undefined || recentSearchQuery === '') {
      return allPostsData;
    }

    return Object.fromEntries(Object.entries(allPostsData).filter(([_slug, data]) => {
      const conditions = searchFilterKeys.map(key => {
        return data[key]?.toString().toLowerCase()
          .includes(recentSearchQuery.toLowerCase())
      });

      return conditions.includes(true);
    }));
  }

  /**
   * Filter the filtered user query data using the provided filter options
   * (GENRE) AND (COLLECTION OR CONTENT_YEAR)
   * COLLECTION and CONTENT_YEAR are mutually exclusive groups.
   * @param {Object} matchingQueryResults Filtered data from filterQuery()
   * @param {Array.<Object>} recentSearchOptions Search filters (debounced)
   * @returns {Object} Filtered results matching the filtered options
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

      // String compare Array.<String>
      let collectionFilter = false; // recentSearchOptions['collections'].length === 0;
      for (const collection of recentSearchOptions['collections']) {
        if (collection === data['collection']?.toString()) {
          collectionFilter = true;
          break;
        }
      }

      // Date compare Array.<String>, convert Date to String
      let contentFilter = false; // recentSearchOptions['contentYears'].length === 0;
      for (const year of recentSearchOptions['contentYears']) {
        const date = new Date(data.date);
        if (year === date.getFullYear().toString() && !data.hasOwnProperty('collection')) {
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

  /**
   * Filters the data by user inputs to return search results 
   * @param {String} recentSearchQuery 
   * @param {Object} recentSearchOptions 
   */
  function filterResults(recentSearchQuery, recentSearchOptions) {
    const matchingQueryResults = filterQuery(recentSearchQuery);

    const matchingFilter = filterOptions(matchingQueryResults, recentSearchOptions);

    const numSearchPages = Math.ceil(Object.keys(matchingFilter).length / searchOptions.resultsPerPage);
    setSearchResults({
      numSearchPages: numSearchPages,
      results: matchingFilter,
    });
    setSearchPage(0); // Reset to first page on search change because there may not be as many results
  }

  /**
   * Must debounce like this to pass in the new value instead of using the old state
   * @param {HTMLElement} e The input element
   */
  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set('q', e.target.value);
    const newURL = new URL(`${url.origin}${url.pathname}?${params}`);
    window.history.replaceState(window.location.href, '', newURL);

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

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set(group, value)

    if (oldSearchOptionGroup.includes(value)) {
      const filtered = oldSearchOptionGroup.filter((v) => { return v !== value; });
      newSearchOptions = {
        ...searchOptions,
        [group]: filtered
      };
      params.set(group, filtered);
    } else {
      newSearchOptions = { ...searchOptions, [group]: [...oldSearchOptionGroup, value] };
      params.set(group, [...oldSearchOptionGroup, value]);
    }

    const newURL = new URL(`${url.origin}${url.pathname}?${params}`);
    window.history.replaceState(window.location.href, '', newURL);

    setSearchOptions(newSearchOptions);
    filterResults(searchQuery, newSearchOptions);
  }

  /**
   * Update the Search URL params in the router so back-navigation saves user input state.
   * Shallow option prevents the page from running getStaticProps and routing to the search 
   * instead of the search result.
   */
  function updateRouter() {
    const url = new URL(window.location.href);
    router.replace(`${url.pathname}${url.search}`, undefined, {shallow: true});
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
          searchQuery={searchQuery}
          searchResults={searchResults}
          searchPage={searchPage}
          handlePageChange={handlePageChange}
          jumpToPage={jumpToPage}
          updateRouter={updateRouter} />
      }
    </>
  )
}

function SearchToolbar({ metadata, searchOptions, searchQuery, handleSearchQuery, handleFilter, handleFilterOptions }) {
  const filterArrowIcon = searchOptions.showFilter ? <span>&#9650;</span> : <span>&#9660;</span>;
  return (
    <form action="/search" method="get" role="search">
      <div className={styles.toolbar__main}>
        <label htmlFor="search-input" className={styles["sr--offscreen"]}>Search Input</label>
        <input
          id="search-input"
          type="search"
          name="q"
          value={searchQuery}
          onChange={e => handleSearchQuery(e)}
          placeholder="Search"
          aria-placeholder="Search for a work"
          autoComplete="search"
          className={styles.query__input}
          autoFocus />
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
    onClick={() => handleChip(group, value)}
    aria-label={`Toggle ${value}`}>
    {group === "collections" ? `No. ${value}` : value}
  </button>
}

function SearchResults({ searchOptions, searchQuery, searchResults, searchPage, handlePageChange, jumpToPage, updateRouter }) {
  const results = searchResults.results;
  return (
    <div className={styles.results__container}>
      <p aria-live="polite">Found {Object.keys(results).length} results.</p>
      <div className={`${styles.results__grid} ${styles.results__header}`}>
        <p>Title</p>
        <p className={styles.results__header__creator}>Creator(s)</p>
        <p className={styles.results__header__tag}>Genre</p>
      </div>
      <ul>
        {
          Object.keys(results).slice(searchPage * searchOptions.resultsPerPage, (searchPage + 1) * searchOptions.resultsPerPage).map((key) => {
            const title = results[key].title;
            let contributor = results[key].contributor;
            const excerpt = results[key].excerpt;
            const tags = results[key].tags.join(', ');

            return <li key={key} className={styles.results__item}>
              <Link href={key}
                className={styles.results__grid}
                onClick={updateRouter}>
                <h3 className={styles.results__title}><MatchingText text={title} query={searchQuery} /></h3>
                <p className={styles.results__contributor}>
                  {contributor.split(',').map((creator) => {
                    return <span key={creator}>/ <MatchingText text={creator.replace(/\(.*\)/, '')} query={searchQuery} /></span>
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
                        alt={"View artwork description in link!"} />
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