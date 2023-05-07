const SITE_URL = 'https://calla-lily.vercel.app'
const EXTERNAL_DATA_URL = `${SITE_URL}/api/_posts`;

function generateSiteMap(pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${Object.keys(pages)
      .map((path) => {
        return `
        <url>
            <loc>${`${SITE_URL}${path}`}</loc>
            <lastmod>${pages[path].date}</lastmod>
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
  const pages = await request.json();

  const sitemap = generateSiteMap(pages);
  res.setHeader('Content-Type', 'text/xml');

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}