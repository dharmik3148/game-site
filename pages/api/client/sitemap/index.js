import db from "../../../../config/dbConfig";

const Category = db.category;
const Game = db.game;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const category_pages = await Category.findAll({ attributes: ["id"] });
    const game_pages = await Game.findAll({ attributes: ["id", "updatedAt"] });
    return res.status(200).send({ status: true, category_pages, game_pages });
  } else {
    return res.status(200).send({ status: false, message: "Not Allowed !!" });
  }
}
