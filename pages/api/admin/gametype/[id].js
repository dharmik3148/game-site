import { uploadSingle } from "@/helpers/singleUpload";
const db = require("@/config/dbConfig");
const GameType = db.game_type;
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
    const { id } = req.query;

    const data = await GameType.findOne({ where: { id } });

    if (!data) {
      return res.status(200).send({ status: false, message: "No Data Found" });
    }

    return res
      .status(200)
      .send({ status: true, message: "GameType entry found", data });
  } else if (req.method === "PATCH") {
    const { id } = req.query;

    const gmtype = await GameType.findOne({ where: { id } });

    if (!gmtype) {
      return res
        .status(200)
        .send({ status: false, message: "Gametype not found" });
    }

    uploadMiddleware(req, res, async () => {
      const { name } = req.body;

      try {
        if (req.file) {
          const oldFilePath = path.join(
            process.cwd(),

            "uploads",
            "gametype",
            gmtype.img_path
          );

          fs.unlinkSync(oldFilePath);

          gmtype.type_img = req.file.filename;
        }

        if (name) {
          gmtype.name = name.trim();
        }

        await gmtype.save();

        return res.status(200).send({
          status: true,
          message: "Gametype updated",
          data: gmtype,
        });
      } catch (error) {
        return res.status(200).send({ status: false, message: error.message });
      }
    });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
