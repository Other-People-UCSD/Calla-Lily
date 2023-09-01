import { getSortedPostsAPIData } from "@/lib/posts";

export default async function handler(req, res) {
  try {
    const sortedPosts = await getSortedPostsAPIData();
    const keyedPosts = {};

    sortedPosts.map((post) => {
      const key = `/${post.slug}`;
      keyedPosts[key] = post;
    });
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json(keyedPosts);
  } catch {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}