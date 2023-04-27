import { useState } from "react";
import searchStyles from "@/styles/search.module.scss";
import Link from "next/link";
import allPostsData from "@/data/_posts.json";

const displayLimit = 10;

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const searchKeys = [
    "slug", "collection", "category", "title",
    "date", "contributor", "tags"
  ]

  function SearchResults() {
    if (searchQuery === '') {
      return;
    }

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
          results.map((key) => {
            const post = allPostsData[key];
            console.log(key);
            return (
              <li key={key}>
                <Link href={{
                  pathname: '/[collection]/[slug]',
                  query: { collection: post.collection, slug: post.slug }
                }}>
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
      <SearchResults />
    </div>
  );
}
