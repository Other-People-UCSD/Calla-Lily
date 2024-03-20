import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import contentStyles from "@/styles/content.module.scss";
import postStyles from "@/styles/posts.module.scss";
import ucStyles from "@/styles/uc.module.scss";
import { useEffect, useState } from "react";
import client from '../tina/__generated__/client'
import { useTina } from "tinacms/dist/react";
import { useRouter } from "next/router";

const defaultSearchOptions = {
  'showFilter': false,
  'colleges': [],
  'q': ''
}

export default function UCMagazines(props) {
  const router = useRouter();
  const [initData, setInitData] = useState(defaultSearchOptions);
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

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
      } else if (key === 'colleges') {
        copyData[key] = val.split(',');
      }
    }

    setInitData(copyData);
  }

  useEffect(() => {
    // Use Next Router, else if visited by a shared URL parse the entries
    if (Object.keys(router.query).length !== 0) {
      handleInitData(router.query);
      return;
    } else {
      // Validate the URL to prevent URL XSS injection
      const loadedURL = new URL(window.location.href);
      const params = new URLSearchParams(loadedURL.search);
      handleInitData(params);
      return;
    }
  }, [router.query]);

  const lastmod = new Date(data.ucmagazines.lastmod).toLocaleDateString();

  return (
    <Layout landingPage title={"UC Magazines"}>
      <div className={contentStyles.submissions__content}>
        <div className={`${animationStyles.fadeInBottom}`}>
          <h1 id="top" style={{ fontSize: 2 + 'rem' }}>List of UC Creative Magazines & Journals</h1>
        </div>

        <p>The University of California system has dozens of magazines and journals highlighting the creative
          minds of their students. Yet none of the UC websites contain a collective listing of these magazines, so it is our duty
          as a student-led magazine to help students find their way to the creative voices across our UC system!
        </p>

        <p>All initial descriptions have been pulled directly from their about pages.</p>
        <p><strong>To update or add your own information please email us at otherpeopleucsd@gmail.com!</strong></p>

        <p><strong>Last Updated: {lastmod}</strong></p>
        <p><strong>*Magazine activity is not updated yet</strong></p>

        <UCCardsDropdown
          magazines={data.ucmagazines.magazines}
          router={router}
          initData={initData} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let data = {};
  let query = {};
  let variables = { relativePath: `../data/uc-magazines.json` };

  try {
    const res = await client.queries.ucmagazines(variables);
    query = res.query;
    data = res.data;
    variables = res.variables;
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      variables: variables,
      data: data,
      query: query
    },
  };
}

const UCCardsDropdown = ({ magazines, router, initData }) => {
  const [isInitialURL, setInitialURL] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initData.q || '');
  const [searchOptions, setSearchOptions] = useState(initData);
  const [searchResults, setSearchResults] = useState(magazines);
  const searchFilterKeys = ['ucsd', 'ucb', 'ucd', 'uci', 'ucla', 'ucr', 'ucm', 'ucsb', 'ucsc'];

  if (isInitialURL) {
    filterResults(searchQuery, searchOptions);
    setInitialURL(false);
    return;
  }

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set('q', e.target.value);
    const newURL = new URL(`${url.origin}${url.pathname}?${params}`);
    window.history.replaceState(window.location.href, '', newURL);
    filterResults(e.target.value, searchOptions)
  }

  const displayDropdown = () => {
    const newSearchOptions = { ...searchOptions, 'showFilter': !searchOptions.showFilter };
    setSearchOptions(newSearchOptions);
  }

  /**
   * Filters the entire initial data by user query
   * @param {String} recentSearchQuery The user search query (debounced) 
   * @returns {Object} Filtered data from allPostsData matching user query
   */
  function filterQuery(recentSearchQuery) {
    // No query, filter based on all data
    if (recentSearchQuery === undefined || recentSearchQuery === '') {
      return magazines;
    }

    return Object.fromEntries(Object.entries(magazines).filter(([_idx, data]) => {
      const conditions = ['active', 'college', 'description', 'est', 'title'].map(key => {
        return data[key]?.toString().toLowerCase().includes(recentSearchQuery.toLowerCase());
      });
      return conditions.includes(true);
    }));
  }

  /**
  * @param {Object} matchingQueryResults Filtered data from filterQuery()
  * @param {Array.<Object>} recentSearchOptions Search filters (debounced)
  * @returns {Object} Filtered results matching the filtered options
  */
  function filterOptions(matchingQueryResults, recentSearchOptions) {
    return Object.fromEntries(Object.entries(matchingQueryResults).filter(([_idx, data]) => {
      // Array.<String> compare Array.<String> do not expect normalized letter-case
      let collegeFilter = false;
      for (const filteredCollege of recentSearchOptions['colleges']) {
        if (data['college'].toLowerCase() === filteredCollege) {
          collegeFilter = true;
          break;
        }
      }

      const collegeIsFiltered = recentSearchOptions['colleges'].length > 0;
      // console.log(collegeFilter, collegeIsFiltered, recentSearchOptions['colleges'])

      return (collegeIsFiltered && collegeFilter) || (!collegeIsFiltered);
    }));
  }


  function filterResults(recentSearchQuery, recentSearchOptions) {
    const matchingQueryResults = filterQuery(recentSearchQuery);
    // console.log('mqr', matchingQueryResults)
    const matchingFilter = filterOptions(matchingQueryResults, recentSearchOptions);
    // console.log('mf', matchingFilter)

    setSearchResults(matchingFilter);
  }

  const handleFilterChange = (value) => {
    const oldSearchOptions = searchOptions['colleges'];
    let newSearchOptions;

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set('colleges', value)

    if (oldSearchOptions.includes(value)) {
      const filtered = oldSearchOptions.filter((v) => { return v !== value && v !== ''; });
      newSearchOptions = {
        ...searchOptions,
        'colleges': filtered
      };
      params.set('colleges', filtered);
    } else {
      newSearchOptions = { ...searchOptions, 'colleges': [...oldSearchOptions, value] };
      params.set('colleges', [...oldSearchOptions, value]);
    }

    // Delete the empty string and clear the parameter if there are no values
    if (params.get('colleges') === '') {
      params.delete('colleges');
    }
    // console.log('arams', params)
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
    router.replace(`${url.pathname}${url.search}`, undefined, { shallow: true });
  }

  const filterArrowIcon = searchOptions.showFilter ? <span>&#9650;</span> : <span>&#9660;</span>;

  return (
    <>
      <div className={ucStyles.search__container}>
        <div className={ucStyles.search__bar}>
          <label id="searchBar" type="text" className={ucStyles.search__label}>Search</label>
          <input htmlFor="searchBar" placeholder='Search...' onChange={handleSearchQuery} className={ucStyles.search__input} />
        </div>
        <div className={ucStyles.multiselect__container}>
          <div className={ucStyles.multiselect__toolbar} onClick={displayDropdown}>
            {searchOptions.colleges.length > 0 ?
              [...searchOptions.colleges].map((college) => {
                const collegeTitle = college.toUpperCase();
                return <li key={college}
                  className={ucStyles["filter__item--selected"]}
                  onClick={(e) => handleFilterChange(e, college)}>
                  {collegeTitle}
                </li>
              })
              :
              <div className={ucStyles.placeholder}>Filter by College {filterArrowIcon}</div>
            }
          </div>
          {searchOptions.showFilter &&
            <div className={ucStyles.multiselect__dropdown}>
              {searchFilterKeys.map((college) => {
                return <ChipCollege key={college} college={college} searchOptions={searchOptions} handleFilterChange={handleFilterChange} />
              })}
            </div>
          }
        </div>
      </div>

      <ul className={ucStyles.result__list}
        aria-live="polite">
        {
          Object.keys(searchResults).map((key) => {
            const title = searchResults[key].title;
            const url = searchResults[key].url;
            const college = searchResults[key].college;
            const est = searchResults[key].est;
            const active = searchResults[key].active;
            const description = searchResults[key].description;

            return <li
              key={title}
              className={ucStyles.result__item}>
              <p className={ucStyles.result__title}>
                {url ? <a href={url} target='_blank' rel='noopener' onClick={updateRouter}>{title}</a> : title}
              </p>
              <span>{college.toUpperCase()} | {est && <><span className={`${postStyles.est} ${postStyles.gold}`}>Est. {est}</span> | </>} {active ? <strong>Active</strong> : 'Inactive'}</span>
              <div className={ucStyles.result__description} dangerouslySetInnerHTML={{ __html: description }} />
            </li>
          })
        }
      </ul>

      <p className={ucStyles.backToTop}><a href="#top">Back to top</a></p>
    </>
  );
}

/**
 * 
 * @param {String} college 
 * @returns 
 */
function ChipCollege({ college, searchOptions, handleFilterChange }) {
  const collegeTitle = college.toUpperCase();

  const classes = `${ucStyles.filter__item} ${(searchOptions['colleges']?.includes(college) && ucStyles['chip--selected'])}`;

  return <button type="button"
    className={classes}
    value={college}
    onClick={() => handleFilterChange(college)}
    aria-label={`Toggle ${college}`}
  >
    <div>{collegeTitle}</div>
  </button>
}