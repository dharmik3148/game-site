const db = require("@/config/dbConfig");

const Ad = db.ad;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await Ad.findAll({});
    return res.status(200).send(data);
  } else if (req.method === "POST") {
    const { ad_name, ad_script } = req.body;

    const data = await Ad.create({
      ad_name,
      ad_script,
    });

    return res.status(200).send(data);
  }
}
