import { getPostDataAPI } from "@/lib/posts";

export default async function handler(req, res) {
  try {
    const { slug } = req.query;
    const postData = await getPostDataAPI(`${slug.join('/')}.mdx`);
    return res.status(200).json(postData);
  } catch (e) {
    console.log(e);
    const { slug } = req.query;
    res.status(500).send({ error: `Failed to fetch data for ${slug.join('/')}` });
  }
}
