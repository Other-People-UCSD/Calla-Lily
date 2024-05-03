import { useState } from "react";

import Link from "next/link";
import styles from "@/styles/posts.module.scss";
import Image from "next/image";

export function PostCardGrid({ postEntries, limit, offset, handleClick }) {
  limit = limit || 6;
  offset = offset || 0;

  return (
    <div className={styles.card__grid__container}>
      {postEntries.slice(offset, offset + limit).map((props, idx) => {
        return <PostCard key={idx} {...props} handleClick={handleClick} />
      })
      }
    </div>
  );
}


export function PostCardSelector({ postEntries }) {
  const [selector, setSelector] = useState({ 'genre': 'poetry', 'entries': postEntries.poetry });

  function handleSelector(genre_str) {
    setSelector({ 'genre': genre_str, 'entries': postEntries[genre_str] });
  }

  return <PostSelectorChild selector={selector} handleSelector={handleSelector} />
}

function PostSelectorChild({ selector, handleSelector = { handleSelector } }) {
  const selectorControlObj = {
    'poetry': 'Poetry',
    'fiction': 'Fiction',
    'nonfiction': 'Nonfiction',
    'visualarts': 'Visual Arts'
  }

  return (
    <div className={styles.selector__container}>
      <div className={styles.selector__wrapper}>
        <div className={styles.selector__controls}>
          {Object.entries(selectorControlObj).map(([genre_str, label]) => {
            const btnClassGenre = `${styles[`selector__button--${genre_str}`]}`;

            const isSelected = `${(genre_str === selector.genre) ? styles['selector__button--selected'] : ''}`;

            return <button
              key={label}
              className={`${styles.selector__button}  ${btnClassGenre} ${isSelected}`}
              onClick={() => handleSelector(genre_str)}>{label}</button>
          })
          }
        </div>
        <hr className={`${styles.selector__divider} ${styles[`divider--${selector.genre}`]}`} />
        <div className={styles.selector__grid__container}>
          {selector.entries.slice(0, 6).map((props, idx) => {
            return <PostCard key={idx} {...props} />
          })
          }
        </div>
      </div>
      <Link href={selector.genre} className={styles.selector__explore}><span>Explore the rest</span> -&gt;</Link>
    </div>
  )
}

export function PostCard({ slug, title, contributor, collection, tags, thumbnail, excerpt, handleClick }) {
  return (
    <Link href={`/${slug}`} key={slug}
      className={styles.card__container}
      onClick={handleClick}>
      <div className={styles.card__contentbox}>

        {(title.length > 30) ? (
          <h2 className={`${styles.card__title} ${styles["card__title--small"]}`}>{title}</h2>
        ) : (
          <h2 className={styles.card__title}>{title}</h2>
        )}
        <p className={styles.card__creator}>
          {contributor.split(',').map((creator) => iconifyCreator(creator, tags))}
        </p>
        <div className={styles.chip__wrapper}>
          {collection ? <Chip type="collection" value={collection} /> : <Chip type="content" value="Content" />}
          {tags.map((tag) => {
            return <Chip key={tag} type="tag" value={tag} />
          })}
        </div>

        {excerpt && <p className={styles.card__excerpt}>{excerpt}</p>}
      </div>

      {thumbnail &&
        <div className={styles.card__thumbnail__frame}>
          <Image src={thumbnail}
            fill={true} sizes="(max-width: 768px) 50px, 150px"

            placeholder="blur" blurDataURL={thumbnail}
            className={styles.card__thumbnail}
            alt="View artwork description in link!" />
        </div>
      }
    </Link>
  );
}

export function LargePostCard({ slug, title, contributor, collection, tags, thumbnail, className, excerpt }) {
  return (
    <Link href={`/${slug}`} key={slug} className={`${styles.card__container} ${styles['card__container--large']} ${className}`}>
      <div className={styles.card__contentbox}>
        {(title.length > 30) ? (
          <h2 className={`${styles.card__title} ${styles["card__title--small"]}`}>{title}</h2>
        ) : (
          <h2 className={styles.card__title}>{title}</h2>
        )}
        <p className={styles.card__creator}>
          {contributor.split(',').map(creator => iconifyCreator(creator, tags))}
        </p>
        <div className={styles.chip__wrapper}>
          {collection ? <Chip type="collection" value={collection} /> : <Chip type="content" value="Content" />}
          {tags.map((tag) => {
            return <Chip key={tag} type="tag" value={tag} />
          })}
        </div>

        {excerpt && <p className={styles.card__excerpt}>{excerpt}</p>}
      </div>
      {thumbnail &&
        <div className={styles.card__thumbnail__frame}>
          <Image src={thumbnail}
            fill={true} sizes="100px"

            placeholder="blur" blurDataURL={thumbnail}
            className={styles.card__thumbnail}
            alt="View artwork description in link!" />
        </div>
      }
    </Link>
  )
}

export function Chip({ type, value }) {
  const coloredClass = getDefinedChipColor(value);

  if (type === "collection") {
    value = `No. ${value}`;
  }

  return <div title={value} className={`${styles.card__chip} ${coloredClass}`}>{value}</div>
}

/**
 * 
 * @param {String} value 
 * @returns Class name for the chip's color
 */
const getDefinedChipColor = (value) => {
  let str = value.toString().toLowerCase();
  const isMultiWord = str.split(' ').length > 1;

  if (isMultiWord) {
    if (str.includes('poetry')) {
      str = 'poetry';
    } else if (str.includes('visual')) {
      str = 'visual';
    }
  }

  return `${styles[`card__chip--${str}`]}`;
}

export function iconifyCreator(creator, tags) {
  let name = creator;
  let role = '';
  const roleIdx = creator.indexOf('(');
  if (roleIdx !== -1) {
    name = creator.slice(0, roleIdx).trim();
    role = creator.slice(roleIdx + 1, -1).toLowerCase();

    // For interviews: Keep the parentheses
    if (role === 'interviewer' || role === 'interviewee') {
      return <span key={name}>
        <svg><use href={`svg/sprites.svg#creator-writer`} /></svg>
        {creator}
      </span>
    }

    // Invalid role
    if (!['writer', 'illustrator', 'developer'].includes(role)) {
      return <span key={name}>/ {name}</span>
    }

    return <span key={name}>
      <svg><use href={`svg/sprites.svg#creator-${role}`} /></svg>
      {name}
    </span>
  } else {
    switch (true) {
      case tags.includes('Visual Arts'):
        return <span key={name}>
          <svg><use href={`svg/sprites.svg#creator-illustrator`} /></svg>
          {name}
        </span>
      case tags.filter((tag) => {
        const lowerTag = tag.toLowerCase();
        return lowerTag.indexOf('fiction') !== -1 || lowerTag.indexOf('poetry') !== -1
      }).length !== 0:
        return <span key={name}>
          <svg><use href={`svg/sprites.svg#creator-writer`} /></svg>
          {name}
        </span>
      default:
        return <span key={name}>/ {name}</span>
    }
  }
}