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
 * USED FOR [...slug].json and pages for Search context
 * Gets all the posts in the postsDirectory sorted by date
 * @returns {Array.<Object>} Posts sorted by most recent date
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
  const allSorted = allPostsData.sort((a, b) => {
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
 * @param {Array.<Object>} allPostsData All posts already sorted by date 
 * @returns {Array.<Object>} All posts that contain genre
 */
export function getGenrePostsData(genre, allPostsData) {
  return allPostsData.filter((post) => {
    return -1 !== post.tags.findIndex((tag) => {
      return tag.includes(genre)
    })
  });
}

/**
 * USED IN [...slug].js, /api/post/[...slug].json
 * Get information of the current post with metadata
 * Also finds the references in allPostsData for previous and next post
 * @param {string} relativePath The path of the current post
 * @param {Array.<Object>} allPostsData All posts already sorted by date
 * @returns {Array.<Object>} Data of the target post
 */
export async function getPostDataAPI({ relativePath, allPostsData, headerType }) {
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

  // Get the content without any HTML tags
  let noHTML = contentHtml.replace(/<.*?>/g, '');
  const blankWords = noHTML.replace(/\n/g, ' ').split(' ');
  const wordsOnly = blankWords.filter((word) => {
    return word.length > 0;
  });
  const wordCount = wordsOnly.length;

  // For SEO (not API): prettifies the content by removing the newlines
  const joinedWords = wordsOnly.join(' ');

  // If there is alt text from any <img />, add the text to the content without HTML
  const altTextArray = contentHtml.match(/alt=?".*?"/g);
  if (altTextArray) {
    const altTextOnly = altTextArray.map((str) => {
      let text = str.match(/"(.*?)"/g).toString().replace(/\"/g, '');
      return 'img_alt: ' + text;
    });
    noHTML += altTextOnly.join(' ');
  }

  // For SSG (not API)
  if (allPostsData) {
    const keyedPosts = {};
    allPostsData.map((post) => {
      const key = `/${post.slug}`;
      keyedPosts[key] = post;
    });

    return {
      wordCount,
      contentHtml,
      excerpt: joinedWords,
      ...keyedPosts[id]
    }
  }
  // For API
  if (headerType === "preview") {
    let excerpt = joinedWords.substring(0, 150);
    if (joinedWords.length >= 150) {
      excerpt += '...';
    }
    return {
      ...matterResult.data,
      wordCount,
      excerpt
    }
  }

  return {
    ...matterResult.data,
    wordCount,
    noHTML,
    contentHtml
  }
}

/**
 * Set the post id to the title of the post, differentiated by collection.
 * @param {String} fileName The name of the file past the postsDirectory path
 * @returns {{slug: String}}  The collection folder and the file's title without the .md ext
 */
export function reformatFileId(fileName) {
  let slug = fileName.replace(/.*_posts./, '');
  slug = slug.replace(/\.mdx?/, '');
  slug = slug.replace(/\\/, '/');
  return {
    slug: slug,
  };
}

/**
 * Get all files recursively starting from the target directory and its subdirectories.
 * @param {String} dir  The full path to the directory
 * @param {Array.<String>} files The files in the directory
 * @returns {Array.<String>} All files in the target directory 
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
 * USED FOR /api/post-data.json
 * Gets all the posts in the postsDirectory sorted by date.
 * This one saves the content and word count of the post
 * @returns {Array.<Object>} Returns post with all content information
 */
export async function getSortedPostsAPIData(headerType) {
  // Get file names under /posts
  const fileNames = getAllFiles(postsDirectory);
  const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
    // Remove "/collection/ .md" from file name to get id
    const { slug } = reformatFileId(fileName);

    // Read markdown file as string
    const fullPath = fileName;
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    try {
      const isoDate = new Date(matterResult.data.date).toISOString()
      matterResult.data.date = isoDate;
    } catch (e) {
      console.log("Err date", slug, e);
    }

    const processedContent = await remark()
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    let noHTML = contentHtml.replace(/<.*?>/g, '');
    const blankWords = noHTML.replace(/\n/g, ' ').split(' ');
    const wordsOnly = blankWords.filter((word) => {
      return word.length > 0;
    })
    const wordCount = wordsOnly.length;

    // If there is alt text from any <img />, add the text to the content without HTML
    const altTextArray = contentHtml.match(/alt=?".*?"/g);
    if (altTextArray) {
      const altTextOnly = altTextArray.map((str) => {
        let text = str.match(/"(.*?)"/g).toString().replace(/\"/g, '');
        return 'img_alt: ' + text;
      });
      noHTML += ' ' + altTextOnly.join(' ');
    }

    if (headerType === 'preview') {
      const joinedWords = wordsOnly.join(' ');
      let excerpt = joinedWords.substring(0, 150);
      if (joinedWords.length >= 150) {
        excerpt += '...';
      }
      return {
        slug,
        wordCount,
        ...matterResult.data,
        excerpt
      }
    }

    // Combine the data with the id
    return {
      slug,
      noHTML,
      wordCount,
      ...matterResult.data,
    };
  }));
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


export async function getSearchPageData() {
  const sortedPosts = await getSortedPostsAPIData('preview');

  const keyedPosts = {};
  const years = new Set();
  const collections = new Set();

  sortedPosts.map((post) => {
    const key = `/${post.slug}`;
    keyedPosts[key] = post;

    if (post.date) {
      const date = new Date(post.date);
      years.add(date.getFullYear().toString());
    }
    if (post.collection) {
      collections.add(post.collection.toString());
    }
  });

  const searchPageData = {
    metadata: {
      years: Array.from(years),
      collections: Array.from(collections),  
    },
    allPostsData: {
      ...keyedPosts
    }
  };

  return searchPageData;
}
