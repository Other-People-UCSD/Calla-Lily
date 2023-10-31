import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import contentStyles from "@/styles/content.module.scss";
import postStyles from "@/styles/posts.module.scss";
import { getSortedPostsData } from "@/lib/posts";
import ucStyles from "@/styles/uc.module.scss";
import { useState } from "react";
import client from '../tina/__generated__/client'
import { useTina } from "tinacms/dist/react";
import { FooterLogo } from "@/components/footer";

export default function UCMagazines(props) {
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const lastmod = new Date(data.ucmagazines.lastmod).toLocaleDateString();

  return (
    <Layout title={"UC Magazines"}>
      <div className={contentStyles.content}>
        <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
          <h1 id="top" style={{ fontSize: 2 + 'rem' }}>List of UC Creative Magazines & Journals</h1>
        </div>

        <p>The University of California system has dozens of magazines and journals highlighting the creative
          minds of their students. Yet none of the UC websites contain a collective listing of these magazines, so it is our duty
          as a student-led magazine to help students find their way to the creative voices across our UC system!
        </p>

        <p>All initial descriptions have been pulled directly from their about pages.</p>
        <p>To update or add your own information, please email us at otherpeopleucsd@gmail.com!</p>

        <p><strong>Last Updated: {lastmod}</strong></p>
        <p><strong>*Magazine activity is not updated yet</strong></p>

        <UCCardsDropdown magazines={data.ucmagazines.magazines} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

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
      query: query,
      allPostsData,
    },
  };
}


const UCCards = ({ magazines }) => {
  const defaultFilter = {
    'active': true,
    'ucsd': true,
    'ucb': false,
    'ucd': false,
    'uci': false,
    'ucla': false,
    'ucr': false,
    'ucm': false,
    'ucsb': false,
    'ucsc': false,
  }

  const [searchQuery, setSearchQuery] = useState(null);
  const [filter, setFilter] = useState(defaultFilter);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  }

  const toggleAll = (event) => {
    const inputs = document.querySelectorAll(`.${ucStyles.filterCollege} input`);
    for (const input of inputs) {
      if (input !== event.target.name) {
        input.checked = event.target.checked;
      }
    }

    if (event.target.checked) {
      const toggleAll = {
        'active': true, 'ucsd': true, 'ucb': true, 'ucd': true, 'uci': true,
        'ucla': true, 'ucr': true, 'ucm': true, 'ucsb': true, 'ucsc': true,
      };
      setFilter(toggleAll);
    } else {
      const toggleNone = {
        'active': true, 'ucsd': false, 'ucb': false, 'ucd': false, 'uci': false,
        'ucla': false, 'ucr': false, 'ucm': false, 'ucsb': false, 'ucsc': false,
      }
      setFilter(toggleNone)
    }
  }

  const handleFilterChange = (event) => {
    const newFilter = {
      ...filter,
      [event.target.name]: event.target.checked
    }
    setFilter(newFilter);
  }

  return (
    <>
      <div className={ucStyles.searchContainer}>
        <div className={ucStyles.searchBox}>
          <label id="searchBar" type="text" className={ucStyles.searchLabel}>Search</label>
          <input htmlFor="searchBar" placeholder='Search' onChange={handleSearchChange} className={ucStyles.searchInput} />
        </div>
        <div className={ucStyles.filterContainer}>
          <div className={ucStyles.filterCollege}>
            <div>
              <input type="checkbox" id="toggleAll" name="toggleAll" onChange={toggleAll} />
              <label htmlFor="toggleAll">Display All</label>
            </div>
            <div>
              <input type="checkbox" id="ucsd" name="ucsd" onChange={handleFilterChange} defaultChecked={true} />
              <label htmlFor="ucsd">UCSD</label>
            </div>
            <div>
              <input type="checkbox" id="ucb" name="ucb" onChange={handleFilterChange} />
              <label htmlFor="ucb">UCB</label>
            </div>
            <div>
              <input type="checkbox" id="ucd" name="ucd" onChange={handleFilterChange} />
              <label htmlFor="ucd">UCD</label>
            </div>
            <div>
              <input type="checkbox" id="uci" name="uci" onChange={handleFilterChange} />
              <label htmlFor="uci">UCI</label>
            </div>
            <div>
              <input type="checkbox" id="ucla" name="ucla" onChange={handleFilterChange} />
              <label htmlFor="ucla">UCLA</label>
            </div>
            <div>
              <input type="checkbox" id="ucr" name="ucr" onChange={handleFilterChange} />
              <label htmlFor="ucr">UCR</label>
            </div>
            <div>
              <input type="checkbox" id="ucm" name="ucm" onChange={handleFilterChange} />
              <label htmlFor="ucm">UCM</label>
            </div>
            <div>
              <input type="checkbox" id="ucsb" name="ucsb" onChange={handleFilterChange} />
              <label htmlFor="ucsb">UCSB</label>
            </div>
            <div>
              <input type="checkbox" id="ucsc" name="ucsc" onChange={handleFilterChange} />
              <label htmlFor="ucsc">UCSC</label>
            </div>
          </div>
        </div>
      </div>

      <ul className={ucStyles.resultContainer}>
        {
          magazines?.map(({ title, url, college, est, active, description }) => {
            const search = searchQuery === null || title?.toLowerCase().includes(searchQuery)
              || college?.toLowerCase().includes(searchQuery); // description?.toLowerCase().includes(searchQuery)
            const show = search && filter[college] && filter['active'] === active;

            return (show &&
              <li
                key={title}
                className={ucStyles.resultCard}>
                <hr />
                <p className={ucStyles.resultTitle}>
                  {url ? <a href={url} target='_blank' rel='noopener'>{title}</a> : title}
                </p>
                <span>{college.toUpperCase()} | {est && <><span className={`${postStyles.est} ${postStyles.gold}`}>Est. {est}</span> | </>} {active ? <strong>Active</strong> : 'Inactive'}</span>
                <p className={ucStyles.resultDescription} dangerouslySetInnerHTML={{ __html: description }} />
              </li>
            );
          })
        }
      </ul>
      <p className={ucStyles.backToTop}><a href="#top">Back to top</a></p>
    </>
  );
}

const UCCardsDropdown = ({ magazines }) => {
  const filterData = {
    "active": true,
    "colleges": [
      'ucsd',
      'ucb',
      'ucd',
      'uci',
      'ucla',
      'ucr',
      'ucm',
      'ucsb',
      'ucsc'
    ],
  }

  const [searchQuery, setSearchQuery] = useState(null);
  const [filter, setFilter] = useState(new Set());
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  }

  const displayDropdown = () => {
    const arrow = document.getElementById("dropdown-arrow")
    arrow.style.transform = showDropdown ? "scale(1, 1)" : "scale(1, -1) translate(0, -4px)";

    setShowDropdown(!showDropdown);
  }

  const modifyCheckbox = (svgElement) => {
    const currentColor = svgElement?.getAttribute("fill");
    if (currentColor === "white") {
      svgElement?.setAttribute("fill", "black");
    } else {
      svgElement?.setAttribute("fill", "white");
    }
  }

  const handleFilterChange = (event, idx) => {
    let newFilter = new Set(filter);
    if (filter.has(filterData.colleges[idx])) {
      newFilter.delete(filterData.colleges[idx]);
    } else {
      newFilter.add(filterData.colleges[idx]);
    }

    console.log(newFilter.entries())
    modifyCheckbox(event.currentTarget?.firstChild)
    setFilter(newFilter);
  }

  return (
    <>
      <div className={ucStyles.searchContainer}>
        <div className={ucStyles.searchBox}>
          <label id="searchBar" type="text" className={ucStyles.searchLabel}>Search</label>
          <input htmlFor="searchBar" placeholder='Search...' onChange={handleSearchChange} className={ucStyles.searchInput} />
        </div>
        <div className={ucStyles.multiselectContainer}>
          <div className={ucStyles.multiselectToolbar} onClick={displayDropdown}>
            {filter.size > 0 ?
              [...filter].map((college, idx) => {
                const collegeTitle = college.toUpperCase();
                return <li key={idx}
                  className={ucStyles.selectedFilterItem}
                  onClick={(e) => handleFilterChange(e, idx)}>
                  {collegeTitle}
                </li>
              })
              :
              <div className={ucStyles.placeholder}>College</div>
            }
            <svg width="32" height="32" stroke="#ccc" fill="#ccc"
              className={ucStyles.checkbox}
              id="dropdown-arrow">
              <path d="m4 16 l 8 8 l 8 -8" />
            </svg>
          </div>
          {showDropdown &&
            <div className={ucStyles.multiselectDropdown}>
              {
                filterData.colleges.map((college, idx) => {
                  const collegeTitle = college.toUpperCase();
                  let checkboxFillColor = "#cbcbcb";
                  if (filter.has(filterData.colleges[idx])) {
                    checkboxFillColor = "#333"
                  }
                  return <li key={idx}
                    onClick={(e) => handleFilterChange(e, idx)}
                    className={ucStyles.filterItem}>
                    <svg width="16" height="16" fill={checkboxFillColor} stroke={checkboxFillColor}
                      className={ucStyles.checkbox}>
                      <rect x="0" y="0" width="16" height="16" rx="4px" />
                    </svg>
                    <div>{collegeTitle}</div>
                  </li>
                })
              }
            </div>
          }
        </div>
      </div>



      <ul className={ucStyles.resultContainer}
        aria-live="polite">
        {
          magazines?.map(({ title, url, college, est, active, description }) => {
            const search = searchQuery === null || title?.toLowerCase().includes(searchQuery)
              || college?.toLowerCase().includes(searchQuery); // description?.toLowerCase().includes(searchQuery)
            const show = search && filter.size > 0 && filter.has(college);

            return (show &&
              <li
                key={title}
                className={ucStyles.resultCard}>
                <hr />
                <p className={ucStyles.resultTitle}>
                  {url ? <a href={url} target='_blank' rel='noopener'>{title}</a> : title}
                </p>
                <span>{college.toUpperCase()} | {est && <><span className={`${postStyles.est} ${postStyles.gold}`}>Est. {est}</span> | </>} {active ? <strong>Active</strong> : 'Inactive'}</span>
                <p className={ucStyles.resultDescription} dangerouslySetInnerHTML={{ __html: description }} />
              </li>
            );
          })
        }
      </ul>

      <p className={ucStyles.backToTop}><a href="#top">Back to top</a></p>
    </>
  );
}
