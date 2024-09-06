import db from "@/config/dbConfig";
import { Op } from "sequelize";
import { shuffle } from "lodash";

const Category = db.category;
const Game = db.game;
const GameType = db.game_type;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await Category.findAll({
      attributes: ["id", "category_img", "category_name"],
    });
    return res.status(200).send({ status: true, data });
  }
  if (req.method === "POST") {
    const { id } = req.query;
    const allCategory = await Category.findAll({
      attributes: ["id", "category_name", "category_img"],
    });

    const category = allCategory.find((category) => category.id == id);

    const category_games = await Game.findAll({
      where: { [Op.and]: [{ categoryId: id }, { game_status: true }] },
      attributes: ["id", "thumbnail", "title"],
      include: [
        {
          model: GameType,
          attributes: ["type_img"],
        },
      ],
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

    const shuffledCategory = shuffle(
      category_games.map((game) => game.toJSON())
    );

    const shuffledGames = shuffle(more_games.map((game) => game.toJSON()));

    const shuffledCategories = shuffle(
      allCategory.map((game) => game.toJSON())
    );

    return res.status(200).send({
      status: true,
      all_category: shuffledCategories,
      category_games: shuffledCategory,
      category: category || {},
      more_games: shuffledGames,
    });
  } else {
    return res.status(200).send({ status: false, message: "Not Allowed !!" });
  }
}
