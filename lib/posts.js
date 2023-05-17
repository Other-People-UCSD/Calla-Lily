import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

export const postsDirectory = path.join(process.cwd(), '_posts');
export const pagesDirectory = path.join(process.cwd(), 'pages');

/**
 * Gets all the posts in the postsDirectory sorted by date
 * @returns 
 */
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = getAllFiles(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove "/collection/ .md" from file name to get id
    const { slug } = reformatFileId(fileName);

    // Read markdown file as string
    const fullPath = fileName;
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    try {
      // console.log("Orig date", slug, matterResult.data.date);
      const isoDate = new Date(matterResult.data.date).toISOString()
      matterResult.data.date = isoDate;
    } catch (e) {
      console.log("Err date", slug, e);
    }

    // Combine the data with the id
    return {
      slug,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  let allSorted = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  // Add the previous and next post references
  for (let i = allSorted.length - 1; i >= 0; i--) {
    const prev = allSorted[i + 1] || null;
    if (prev) {
      allSorted[i].prevPost = `/${prev.slug}`;
    }
    const next = allSorted[i - 1] || null;
    if (next) {
      allSorted[i].nextPost = `/${next.slug}`;
    }
  }

  return allSorted;
}

/**
 * Gets the posts with the given genre within the post's tags
 * The tag can be part of a larger tag e.g. "Prose Poetry"
 * @param {String} genre The tag of the post to find
 * @param {Array} allPostsData All posts already sorted by date 
 * @returns 
 */
export function getGenrePostsData(genre, allPostsData) {
  return allPostsData.filter((post) => {
    return -1 !== post.tags.findIndex((tag) => {
      return tag.includes(genre)
    })
  });
}

/**
 * Get information of the current post with metadata
 * Also finds the references in allPostsData for previous and next post
 * @param {String} relativePath The path of the current post
 * @param {Array} allPostsData All posts already sorted by date
 * @returns 
 */
export async function getPostDataAPI(relativePath, allPostsData) {
  const fullPath = path.join(postsDirectory, relativePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();
  const id = `/${relativePath.replace(/\.mdx?/, '')}`;

  const noHTML = contentHtml.replace(/<.*?>/g, '');
  const blankWords = noHTML.split(' ');
  const wordsOnly = blankWords.filter((word) => {
    return word.length > 0;
  })

  const wordCount = wordsOnly.length;
  const excerpt = wordsOnly.join(' ');

  const keyedPosts = {};
  allPostsData.map((post) => {
    const key = `/${post.slug}`;
    keyedPosts[key] = post;
  });

  return {
    wordCount,
    contentHtml,
    excerpt,
    ...keyedPosts[id],
  }
}

/**
 * Set the post id to the title of the post, differentiated by collection.
 * @param {String} fileName The name of the file past the postsDirectory path
 * @returns {String, String}  The collection folder and the file's title without the .md ext
 */
export function reformatFileId(fileName) {
  fileName = fileName.replace(/.*_posts./, '');
  // const slug = fileName.substring(fileName.indexOf('\\') + 1).replace(/\.mdx?/, '');
  fileName = fileName.replace(/\.mdx?/, '');
  fileName = fileName.replace(/\\/, '/');
  const slug = fileName
  // console.log(slug);
  return {
    slug: slug,
  };
}

/**
 * Get all files recursively starting from the target directory and its subdirectories.
 * @param {String} dir  The full path to the directory
 * @param {Array} files The files in the directory
 * @returns       files All files in the target directory 
 */
export function getAllFiles(dir, files) {
  if (fs.existsSync(dir) === false) {
    return files;
  }
  files = files || [];
  const dirFiles = fs.readdirSync(dir);
  dirFiles.forEach(file => {
    const fileName = path.join(dir, file);
    if (fs.statSync(fileName).isDirectory()) {
      getAllFiles(fileName, files)
    } else {
      files.push(fileName);
    }
  })
  return files;
}

/**
 * For auto-generating the valid pages in the sitemap
 */
export function getLandingPages() {
  const fileNames = getAllFiles(pagesDirectory);
  const pages = fileNames.map((fileName) => {
    fileName = fileName.replace(/.*pages./, '');
    fileName = fileName.replace(/\.js/, '');
    fileName = fileName.replace(/\\/, '/');
    const slug = fileName;
    return { slug }
  });

  const remove = ['js', 'api/_posts', 'api/pages',
    '_app', '_document', '[...slug]', 'sitemap.xml']

  return pages.filter((page) => {
    return !remove.some((e) => {
      return page.slug.includes(e);
    });
  })
}