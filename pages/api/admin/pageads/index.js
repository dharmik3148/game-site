const db = require("@/config/dbConfig");

const PageAd = db.pageads;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { pagetype } = req.headers;

    const data = await PageAd.findOrCreate({
      where: { page_type: pagetype },
      default: { page_type: pagetype, ad_status: false, adId: null },
    });

    return res.status(200).send({ status: true, data });
  }
}
