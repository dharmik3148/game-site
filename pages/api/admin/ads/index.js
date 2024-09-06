const db = require("@/config/dbConfig");

const Ad = db.ad;
const Game = db.game;
const PageAds = db.pageads;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await Ad.findAll({});

    return res.status(200).send(data);
  } else if (req.method === "POST") {
    const { ad_name, ad_client, ad_slot, ad_format, ad_fullWidthResponsive } =
      req.body;

    try {
      const data = await Ad.create({
        ad_name,
        ad_client,
        ad_slot,
        ad_format,
        ad_fullWidthResponsive,
      });

      return res
        .status(200)
        .send({ status: true, message: "Ad script added", data });
    } catch (error) {
      return res.status(200).send({ status: false, message: error.message });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.headers;

    const ad = await Ad.findOne({ where: { id } });

    console.log(ad);

    if (!ad) {
      return res.status(200).send({ status: false, message: "Ad not found" });
    }

    const associatedGames = await Game.findOne({
      where: { adId: id },
    });

    if (associatedGames) {
      return res.status(200).send({
        status: false,
        message: "Cannot delete ad, there are games associated with this ad",
      });
    }

    const checkPageAds = await PageAds.findOne({ where: { adId: id } });

    if (checkPageAds) {
      return res.status(200).send({
        status: false,
        message: `Cannot delete ad, ad linked to ${checkPageAds.page_type}`,
      });
    }

    await Ad.destroy({ where: { id: ad.id } });

    return res.status(200).send({ status: true, message: "Ad deleted" });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
