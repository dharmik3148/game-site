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
          attributes: ["id", "category_name"],
        },
        {
          model: GameType,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!data) {
      return res.status(200).send({
        status: false,
        error: "No game found",
      });
    }

    const ads = await Ads.findAll({ attributes: ["id", "ad_name"] });
    const category = await Category.findAll({
      attributes: ["id", "category_name"],
    });
    const gametype = await GameType.findAll({
      attributes: ["id", "name"],
    });

    data.played_count += 1;

    await data.save();

    return res
      .status(200)
      .json({
        status: true,
        message: "Game entry found",
        game: data,
        groundData: { ads, category, gametype },
      });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
