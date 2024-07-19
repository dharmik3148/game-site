const db = require("@/config/dbConfig");
const { uploadSingle } = require("@/helpers/singleUpload");
const GameType = db.game_type;

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
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { name } = req.body;

      try {
        const gametype = await GameType.create({
          name,
          type_img: req.file.filename,
        });

        return res.status(200).send({ data: gametype });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }
}
