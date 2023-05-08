import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import stripMarkdown from 'strip-markdown';

export const postsDirectory = path.join(process.cwd(), '_posts');

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

export function getGenrePostsData(genre, allPostsData) {
  return allPostsData.filter((post) => {
    return post.tags.includes(genre)
  });
}

export function getAllPostIds() {
  const fileNames = getAllFiles(postsDirectory);
  return fileNames.map((fileName) => {
    const { slug } = reformatFileId(fileName);
    return {
      params: {
        slug: slug,
      }
    };
  })
}

/**
 * Get the data contained in the front matter and content.
 * @param {String} id 
 * @returns Data from the post 
 */
export async function getPostData(slug) {
  const fPath = buildFilePath(slug);

  const fullPath = path.join(postsDirectory, fPath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);

  const wordCount = matterResult.content.split(' ').length;
  const contentHtml = processedContent.toString();

  return {
    slug,
    wordCount,
    contentHtml,
    ...matterResult.data,
  }
}

export async function getPostDataAPI(relativePath, postsData) {
  const fullPath = path.join(postsDirectory, relativePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);

  const wordCount = matterResult.content.split(' ').length;
  const contentHtml = processedContent.toString();
  const id = `/${relativePath.replace(/\.mdx?/,'')}`;

  const processedContent2 = await remark()
    .use(stripMarkdown)
    .process(matterResult.content);
  // console.log('excerpt', excerpt.value)
  const excerpt = processedContent2.toString()

  const keyedPosts = {};
  postsData.map((post) => {
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
 * Recreate the filename as saved in the postsDirectory.
 * @param {String} slug       The title of the file
 * @param {String} collection The collection of the file 
 * @returns 
 */
export function buildFilePath(slug) {
  // console.log('BuildFP:', `${id}.md`);
  return `${slug}.mdx`;
}

/**
 * Get all files starting from the target directory and its subdirectories.
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
