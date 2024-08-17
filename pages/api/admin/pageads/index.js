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
  } else if (req.method === "PATCH") {
    const { pagetype, ad_status, ad_id } = req.body;

    const findPageType = await PageAd.findOne({
      where: { page_type: pagetype },
    });

    if (!findPageType) {
      return res.status(200).send({ status: false, message: "Invalid page" });
    }

    try {
      if (typeof ad_status !== "undefined") findPageType.ad_status = ad_status;
      if (ad_id) findPageType.adId = ad_id;

      await findPageType.save();

      return res
        .status(200)
        .send({ status: true, message: "Successfully updated" });
    } catch (error) {
      return res
        .status(200)
        .send({ status: false, message: "Something went wrong" });
    }
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
