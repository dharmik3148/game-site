import db from "@/config/dbConfig";
import { shuffle } from "lodash";
const Game = db.game;
const GameType = db.game_type;

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
  } else {
    return res.status(200).send({ status: false, message: "Not Allowed !!" });
  }
}
