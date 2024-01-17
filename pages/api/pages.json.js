import { getLandingPages } from "@/lib/posts";

export default async function handler(req, res) {
  try {
    const landingPages = await getLandingPages();
    // const keyedPages = {};

    // landingPages.map((page) => {
    //   const key = `/${page.slug}`;
    //   keyedPages[key] = page;
    // });
    console.log(landingPages)
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json(landingPages);
  } catch (e){
    console.log(e)
    res.status(500).send({ error: 'Failed to fetch data' });
  }
}