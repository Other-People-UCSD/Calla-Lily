import { useState, useEffect } from "react";
import { LargePostCard, PostCard } from "./PostCard";
import styles from "@/styles/posts.module.scss";

/**
 * 
 * @param {Array.<Object>} entries 
 * @param {Number} group
 * @returns 
 */
export function Randomizer({ entries, group, numResults }) {
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

  if (numResults === 3) {
    return <CardsB1_S2 entries={randomEntries} />
  }

  return (
    <div className={styles.random__grid__container}>
      {randomEntries.map((props, idx) => {
        return <PostCard key={idx} {...props} />
      })}
    </div>
  )
}

/**
 * One big card with two smaller cards on the second row.
 * @param {Array} entries 
 */
function CardsB1_S2({ entries }) {

  return (
    <>
      <LargePostCard {...entries[0]} className={styles.random__desktop} />

      <div className={styles.random__grid__container}>
        {entries.slice(1).map((props, idx) => {
          return <PostCard key={idx} {...props} />
        })}
      </div>
    </>
  )

}