import { getLandingPages } from "@/lib/posts";

export default function handler(req, res) {
  try {
    const landingPages = getLandingPages();
    const keyedPages = {};

    landingPages.map((page) => {
      const key = `/${page.slug}`;
      keyedPages[key] = page;
    });

    return res.status(200).json(keyedPages);
  } catch {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}