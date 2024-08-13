const db = require("@/config/dbConfig");
const { uploadSingle } = require("@/helpers/singleUpload");
const GameType = db.game_type;
const Game = db.game;
const fs = require("fs");
const path = require("path");

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = uploadSingle("gametype", "gametype_img");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await GameType.findAll({});
    return res.status(200).send(data);
  } else if (req.method === "POST") {
    uploadMiddleware(req, res, async () => {
      if (!req.file) {
        return res
          .status(200)
          .send({ status: false, message: "No file uploaded" });
      }

      const { name } = req.body;

      try {
        const gametype = await GameType.create({
          name: name.trim(),
          type_img: req.file.filename,
        });

        return res
          .status(200)
          .send({ status: true, message: "New gametype added", gametype });
      } catch (error) {
        return res.status(200).send({ status: false, message: error.message });
      }
    });
  } else if (req.method === "DELETE") {
    const { id } = req.headers;

    const gmtype = await GameType.findOne({
      where: { id },
    });

    if (!gmtype) {
      return res
        .status(200)
        .send({ status: false, message: "Gametype not found" });
    }

    const associatedGames = await Game.findOne({
      where: { game_typeId: id },
    });

    if (associatedGames) {
      return res.status(200).send({
        status: false,
        message:
          "Cannot delete gametype, there are games associated with this gametype",
      });
    }

    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "gametype",
      gmtype.img_path
    );

    fs.unlink(filePath, async (err) => {
      if (err) {
        return res
          .status(200)
          .send({ status: false, message: "Failed to delete the file" });
      }

      await GameType.destroy({ where: { id: gmtype.id } });
    });

    return res.status(200).send({ status: true, message: "Gametype deleted" });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
