const db = require("@/config/dbConfig");

const Ads = db.ad;
const Category = db.category;
const GameType = db.game_type;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const ads = await Ads.findAll({ attributes: ["id", "ad_name"] });
    const category = await Category.findAll({
      attributes: ["id", "category_name"],
    });
    const gametype = await GameType.findAll({
      attributes: ["id", "name"],
    });

    return res.status(200).send({ status: true, ads, category, gametype });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
