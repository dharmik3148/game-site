import db from "@/config/dbConfig";
const Game = db.game;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await Game.findAll({
      where: { game_status: true },
      attributes: ["id", "thumbnail", "title"],
    });
    return res.status(200).send({ status: true, data });
  }
}
