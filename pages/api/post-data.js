import { getSortedPostsAPIData } from "@/lib/posts";

export default async function handler(req, res) {
  try {
    const sortedPosts = await getSortedPostsAPIData();
    const keyedPosts = {};

    // console.log(sortedPosts)
    sortedPosts.map((post) => {
      const key = `/${post.slug}`;
      keyedPosts[key] = post;
    });

    return res.status(200).json(keyedPosts);
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}