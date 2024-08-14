const db = require("@/config/dbConfig");

const Ads = db.ad;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const data = await Ads.findOne({ where: { id } });

    if (!data) {
      return res.status(200).send({ status: false, message: "No Data Found" });
    }

    return res
      .status(200)
      .send({ status: true, message: "Ad entry found", data });
  } else if (req.method === "PATCH") {
    const {
      id,
      ad_name,
      ad_client,
      ad_slot,
      ad_format,
      ad_fullWidthResponsive,
    } = req.body;

    const item = await Ads.findOne({ where: { id } });

    if (!item) {
      return res.status(200).send({ status: false, message: "No Ad Found" });
    }

    const update = await Ads.update(
      {
        ad_name: ad_name.trim(),
        ad_client: ad_client.trim(),
        ad_slot: ad_slot.trim(),
        ad_format: ad_format.trim(),
        ad_fullWidthResponsive: ad_fullWidthResponsive.trim(),
      },
      { where: { id } }
    );

    if (update === 0) {
      return res
        .status(200)
        .send({ status: false, message: "No Data Found or No Changes Made" });
    }

    const updatedData = await Ads.findOne({ where: { id } });

    return res
      .status(200)
      .send({ status: true, message: "Ad updated", data: updatedData });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
