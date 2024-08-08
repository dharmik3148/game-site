const db = require("@/config/dbConfig");

const AboutUs = db.aboutus;
const PageAds = db.pageads;
const Ads = db.ad;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { pagetype } = req.headers;
    const ads = await PageAds.findOne({
      where: { page_type: pagetype },
      attributes: ["id", "page_type", "ad_status"],
      include: [{ model: Ads, attributes: ["id", "ad_name"] }],
    });

    const data = await AboutUs.findAll({});

    const allAds = await Ads.findAll({ attributes: ["id", "ad_name"] });

    return res.status(200).send({ status: true, data, ads, allAds });
  } else if (req.method === "POST") {
    const { heading, content } = req.body;

    if (!heading || !content) {
      return res
        .status(200)
        .send({ status: false, message: "All fields required" });
    }

    const data = await AboutUs.create({ heading, content });

    return res
      .status(200)
      .send({ status: true, message: "Content added", data });
  } else if (req.method === "DELETE") {
    const { id } = req.headers;

    const isAvail = await AboutUs.findOne({ where: { id } });

    if (!isAvail) {
      return res
        .status(200)
        .send({ status: false, message: "No content available" });
    }

    await AboutUs.destroy({ where: { id } });

    return res.status(200).send({ status: true, message: "Content deleted" });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
