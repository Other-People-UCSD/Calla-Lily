import React from "react";
import { PropTypes } from 'prop-types';

import Image from "next/image";
import Link from "next/link";

import '../../styles/globals.scss'
import postStyles from '../../styles/posts.module.scss';

export default function PostCard({ slug, title, contributor, collection, tags, thumbnail }) {
  return (
    <div className={postStyles["post-container"]}>
      <Link href={`/${slug}`} key={slug}>
        <div className={postStyles["post-info"]}>
          {(title.length > 30) ? (
            <h2 className={postStyles["small-title"]}>{title}</h2>
          ) : (
            <h2>{title}</h2>
          )}
          <div className={postStyles.thumb}>
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={title}
                fill={true}
                sizes="width: 60px"
                quality={25} />
            ) : (null)}
          </div>
          <div className={postStyles["card-info"]}>
            <h3> / <span>{contributor.split(', ').map((author) => (<span key={author}>{author} <br /></span>))}</span></h3>
            <h4>{tags.map((tag) => (<span key={tag}>{tag}<br /></span>))}</h4>
            {collection ? (<h4 style={{ color: "rgb(255, 153, 0)" }}>No. {collection}</h4>) : (null)}
          </div>
        </div>
      </Link>
    </div>
  );
}

PostCard.PropTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contributor: PropTypes.string.isRequired,
  collection: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  thumbnail: PropTypes.string,
}