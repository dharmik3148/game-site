const db = require("@/config/dbConfig");

const Game = db.game;
const Category = db.category;
const GameType = db.game_type;
const Ad = db.ad;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const games = await Game.findAndCountAll({});
    const categories = await Category.findAndCountAll({});
    const gametypes = await GameType.findAndCountAll({});
    const ads = await Ad.findAndCountAll({});

    return res.status(200).send({
      status: true,
      games: games.count,
      categories: categories.count,
      game_types: gametypes.count,
      ads: ads.count,
    });
  } else {
    return res
      .status(200)
      .send({ status: false, error: "Authorization failed" });
  }
}
