const db = require("@/config/dbConfig");

const Ad = db.ad;

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
  }
}
