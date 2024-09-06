import db from "@/config/dbConfig";
import { shuffle } from "lodash";
import { Op } from "sequelize";
const Game = db.game;
const GameType = db.game_type;
const Ads = db.ad;
const Category = db.category;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await Game.findAll({
      where: { game_status: true },
      attributes: ["id", "thumbnail", "title"],
      include: [
        {
          model: GameType,
          attributes: ["type_img"],
        },
      ],
    });

    const shuffledGames = shuffle(data.map((game) => game.toJSON()));

    return res.status(200).send({ status: true, data: shuffledGames });
  } else if (req.method === "POST") {
    const { id } = req.query;

    const game = await Game.findOne({
      where: { [Op.and]: [{ id: id }, { game_status: true }] },
      attributes: [
        "id",
        "thumbnail",
        "game_path",
        "title",
        "description",
        "played_count",
        "ad_status",
        "game_status",
        "page_title",
        "meta_description",
        "createdAt",
      ],

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
          attributes: ["type_img", "name"],
        },
      ],
    });

    if (game) {
      game.played_count += 1;

      await game.save();
    }

    const allCategory = await Category.findAll({
      attributes: ["id", "category_name", "category_img"],
    });

    const more_games = await Game.findAll({
      where: { game_status: true },
      attributes: ["id", "thumbnail", "title"],
      include: [
        {
          model: GameType,
          attributes: ["type_img"],
        },
      ],
    });

    const shuffledCategory = shuffle(allCategory.map((game) => game.toJSON()));

    const shuffledGames = shuffle(more_games.map((game) => game.toJSON()));

    return res.status(200).send({
      status: true,
      game: game || {},
      all_category: shuffledCategory,
      more_games: shuffledGames,
    });
  } else {
    return res.status(200).send({ status: false, message: "Not Allowed !!" });
  }
}
