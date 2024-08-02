import db from "@/config/dbConfig";
const Game = db.game;
const Ads = db.ad;
const Category = db.category;
const GameType = db.game_type;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const data = await Game.findOne({
      where: { id: id },

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

    if (!data) return res.status(400).send({ error: "No game found" });

    // data.played_count += 1;

    // await data.save();

    return res.status(200).json({ status: true, data });
  }
}
