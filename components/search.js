import { useEffect, useState } from "react";
import searchStyles from "@/styles/search.module.scss";
import Link from "next/link";
import { useAppContext } from "@/components/appContext";

export default function Search({ setShowNav }) {
  const [searchQuery, setSearchQuery] = useState('');
  const context = useAppContext();
  const allPostsData = context.allPostsData;

  const getSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  }

  // Auto focus the search bar when the menu is opened, 
  // But prevent the window from scrolling so top of header is still visible 
  useEffect(() => {
    document.getElementById('search-input').focus({ preventScroll: true });
  }, []);

  return (
    <div className={searchStyles["search-wrapper"]}>
      <div id="search-container" className={searchStyles.searchContainer}>
        <input
          type="text"
          id="search-input"
          placeholder="Search"
          aria-placeholder="Type here to search"
          // autoFocus={true}
          onChange={getSearchQuery} />
        <SearchResults
          setShowNav={setShowNav}
          searchQuery={searchQuery}
          allPostsData={allPostsData}
        />
      </div>
    </div>

  );
}

const SearchResults = ({ searchQuery, allPostsData }) => {
  if (searchQuery === '') {
    return;
  }

  const displayLimit = 10;
  const searchKeys = [
    "slug", "collection", "category", "title",
    "date", "contributor", "tags"
  ]

  const postsQuery = Object.keys(allPostsData).filter(id => {
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

  const results = postsQuery.slice(0, displayLimit);

  return (
    <ul id="results-container">
      {
        results.length > 0 ? (
          results.map((key) => {
            const post = allPostsData[key];
            return (
              <li key={key}>
                <Link href={`/${post.slug}`}>
                  <h2>{post.title}</h2>
                  <h3>{post.contributor}</h3>
                  <h4>{post.tags.join(", ")}</h4>
                </Link>
                <br />
                <hr />
              </li>
            );
          })
        ) : (
          "No results found. Try searching by title, author, tags, or collection number/year!"
        )
      }
    </ul>
  );
}