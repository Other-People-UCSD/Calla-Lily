import { getPostDataAPI } from "@/lib/posts";

export default async function handler(req, res) {
  try {
    const { slug } = req.query;
    let postData;
    if (req.headers['opm-content-preview'] === 'true') {
      postData = await getPostDataAPI(`${slug.join('/')}.mdx`, null, "preview");
    } else {
      postData = await getPostDataAPI(`${slug.join('/')}.mdx`);
    }
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(postData);
  } catch (e) {
    console.log(e);
    const { slug } = req.query;
    res.status(500).send({ error: `Failed to fetch data for ${slug.join('/')}` });
  }
}
