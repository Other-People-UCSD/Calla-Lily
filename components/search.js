import { useState } from "react";
import searchStyles from "@/styles/search.module.scss";
import Link from "next/link";
import allPostsData from "@/data/_posts.json";

const displayLimit = 10;

export default function Search({ setShowNav }) {
  const [searchQuery, setSearchQuery] = useState('');

  const getSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  }

  return (
    <div id="search-contianer" className={searchStyles.searchContainer}>
      <input
        type="text"
        id="search-input"
        placeholder="Search"
        aria-placeholder="Type here to search"
        onChange={getSearchQuery} />
      <SearchResults 
        setShowNav={setShowNav} 
        searchQuery={searchQuery} />
    </div>
  );
}

const SearchResults = ({ setShowNav, searchQuery }) => {
  if (searchQuery === '') {
    return;
  }

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


  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    setShowNav(false);
  }

  return (
    <ul id="results-container">
      {
        results.map((key) => {
          const post = allPostsData[key];
          console.log(key);
          return (
            <li key={key}>
              <Link href={`/${post.slug}`}
                onClick={closeNav}>
                <h2>{post.title}</h2>
                <h3>{post.contributor}</h3>
                <h4>{post.tags.join(", ")}</h4>
              </Link>
              <br />
              <hr />
            </li>
          );
        })
      }
    </ul>
  );
}