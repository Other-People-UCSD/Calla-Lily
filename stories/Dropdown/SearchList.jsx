import React from 'react';
import { PropTypes } from 'prop-types';
import Link from 'next/link';

import './dropdown.scss';

Item.propTypes = {
  item: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    contributor: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
  }),
  handleClick: PropTypes.func
}

SearchList.propTypes = {
  items: PropTypes.array,
  handleClick: PropTypes.func
}

function Item({ item: { slug, title, contributor, tags }, handleClick }) {
  return (
    <li>
      <Link href={`/${slug}`}
        onClick={handleClick}>
        <h2>{title}</h2>
        <h3>{contributor}</h3>
        <h4>{tags.join(", ")}</h4>
      </Link>
      <br />
      <hr />
    </li>
  )
}


export default function SearchList({ items, handleClick }) {
  const events = {
    handleClick
  };

  return (
    <div className="searchWrapper">
      <ul>
        {items.map((item, idx) => (
          <Item key={idx} item={item} {...events} />
        ))}
      </ul>
    </div>
  );
}