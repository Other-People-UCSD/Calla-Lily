export default async function handler(req, res) {
  try {
    const landingPages = {
      "/": { "slug": "/" },
      "/about": { "slug": "about" },
      "/submissions": { "slug": "submissions" },
      "/uc-magazines": { "slug": "/uc-magazines" },
      "/fiction": { "slug": "fiction" },
      "/nonfiction": { "slug": "nonfiction" },
      "/poetry": { "slug": "poetry" },
      "/visualarts": { "slug": "visualarts" },
      "/sitemap.xml": { "slug": "/sitemap.xml" }
    };

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(landingPages);
  } catch {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}