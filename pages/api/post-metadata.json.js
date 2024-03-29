import { getSortedPostsData } from "@/lib/posts";

export default function handler(req, res) {
  try {
    const sortedPosts = getSortedPostsData();
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