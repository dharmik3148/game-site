import { Op } from "sequelize";

const db = require("@/config/dbConfig");
const Game = db.game;
const Ads = db.ad;
const Category = db.category;
const GameType = db.game_type;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { searchTerm } = req.body;

    try {
      const games = await Game.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${searchTerm}%` } },
            { description: { [Op.like]: `%${searchTerm}%` } },
            { played_count: { [Op.like]: `%${searchTerm}%` } },
            { page_title: { [Op.like]: `%${searchTerm}%` } },
            { meta_description: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
        include: [
          {
            model: Ads,
          },
          {
            model: Category,
            attributes: ["category_name", "category_img"],
          },
          {
            model: GameType,
            attributes: ["name", "type_img"],
          },
        ],
      });

      if (!games) {
        return res.status(200).send({
          status: false,
          message: "No games found matching the search term.",
        });
      }

      return res.status(200).send({ status: true, games });
    } catch (error) {
      return res.status(200).send({ status: false, messgae: error.message });
    }
  } else {
    return res
      .status(200)
      .send({ status: false, messgae: "Authorization failed" });
  }
}
