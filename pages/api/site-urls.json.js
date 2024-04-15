const SITE_URL = 'https://calla-lily-git-mockups-other-people.vercel.app';
const EXTERNAL_DATA_URL = `${SITE_URL}/api/post-metadata.json`;
const EXTERNAL_PAGE_URL = `${SITE_URL}/api/pages.json`;

export default async function handler(req, res) {
  try {
    const request = await fetch(EXTERNAL_DATA_URL);
    const posts = await request.json();
    const landing = await fetch(EXTERNAL_PAGE_URL);
    const landingPages = await landing.json();
    res.setHeader('Content-Type', 'application/json');

    const outputUrls = { urls: [] }
    Object.keys(landingPages).forEach((slug) => {outputUrls.urls.push(`${SITE_URL}${slug}`)})
    Object.keys(posts).forEach((slug) => {outputUrls.urls.push(`${SITE_URL}${slug}`)})

    return res.status(200).json(outputUrls);
  } catch {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}