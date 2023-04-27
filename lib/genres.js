import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { postsDirectory, getAllFiles, reformatFileId } from './posts';

export function getGenrePostsData(genre) {
  // Get file names under /posts
  const fileNames = getAllFiles(postsDirectory);
  // console.log(fileNames)
  const allGenrePostsData = fileNames
    .filter((fileName) => {
      const matterResult = matter(fs.readFileSync(fileName, 'utf8'));
      // console.log(matterResult.data.tags.includes(genre));
      return matterResult.data.tags.includes(genre);
    })
    .map((fileName) => {
      const { slug, collection } = reformatFileId(fileName);

      // Read markdown file as string
      const fullPath = fileName;
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      // console.log(matterResult)

      // Combine the data with the id
      return {
        slug,
        collection,
        ...matterResult.data,
      };
    });

  // Sort posts by date
  return allGenrePostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}