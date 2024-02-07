import { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import styles from "@/styles/posts.module.scss";

/**
 * 
 * @param {Array.<Object>} entries 
 * @param {Number} group
 * @returns 
 */
export function Randomizer({entries, group, numResults}) {
  const [hasMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!hasMounted) {
    return;
  }

  const groupEntries = entries.filter((entry) => {
    return entry.collection === group;
  });

  let iters = numResults - 1;
  let len = groupEntries.length;
  const randomEntries = new Array(numResults - 1);
  const taken = new Array(groupEntries.length);

  while (iters >= 0) {
    const randIdx = Math.floor(Math.random() * groupEntries.length);
    randomEntries[iters] = groupEntries[randIdx in taken ? taken[randIdx] : randIdx];
    taken[randIdx] = --len in taken ? taken[len] : len;
    iters -= 1;
  }

  return (
    <div className={styles.random__grid__container}>
      { randomEntries.map((props, idx) => {
          return <PostCard key={idx} {...props} />
      })}
    </div>
  )
}