const SITE_URL = 'https://calla-lily.vercel.app'
const EXTERNAL_DATA_URL = `${SITE_URL}/api/_posts`;
const EXTERNAL_PAGE_URL = `${SITE_URL}/api/pages`;

function generateSiteMap(posts, pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${Object.keys(pages)
      .map((path) => {
        return `
          <url>
            <loc>${`${SITE_URL}${path}`}</loc>
          </url>
        `;
      })
      .join('')}
      ${Object.keys(posts)
      .map((path) => {
        return `
        <url>
            <loc>${`${SITE_URL}${path}`}</loc>
            <lastmod>${posts[path].date}</lastmod>
        </url>
      `;
      })
      .join('')}
    </urlset>
 `;
}

export default function SiteMap() {

}

export async function getServerSideProps({ res }) {
  const request = await fetch(EXTERNAL_DATA_URL);
  console.log(request)
  const posts = await request.json();

  const landing = await fetch(EXTERNAL_PAGE_URL);
  const landingPages = await landing.json();

  const sitemap = generateSiteMap(posts, landingPages);
  res.setHeader('Content-Type', 'text/xml');

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}