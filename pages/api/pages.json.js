import { getLandingPages } from "@/lib/posts";

export default async function handler(req, res) {
  try {
    const landingPages = await getLandingPages();
    const keyedPages = {};

    landingPages.map((page) => {
      const key = `/${page.slug}`;
      keyedPages[key] = page;
    });
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json(keyedPages);
  } catch {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}