import { getSortedPostsAPIData } from "@/lib/posts";

export default async function handler(req, res) {
  try {
    const sortedPosts = await getSortedPostsAPIData(req.headers['opm-content']);
    const keyedPosts = {};
    const years = new Set();
    const collections = new Set();

    sortedPosts.map((post) => {
      const key = `/${post.slug}`;
      keyedPosts[key] = post;

      if (post.date) {
        const date = new Date(post.date);
        years.add(date.getFullYear());
      }
      if (post.collection) {
        collections.add(post.collection);
      }
    });
    
    const metadata = {
      years: Array.from(years), 
      collections: Array.from(collections), 
      ...keyedPosts};
    
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(metadata);
  } catch (e){
    console.log(e)
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}