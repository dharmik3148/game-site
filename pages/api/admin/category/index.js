import db from "@/config/dbConfig";
const Category = db.category;
const { uploadSingle } = require("@/helpers/singleUpload");

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = uploadSingle("category", "cat_img");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await Category.findAll({});
    return res.status(200).send(data);
  } else if (req.method === "POST") {
    uploadMiddleware(req, res, async () => {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { category_name } = req.body;

      try {
        const category = await Category.create({
          category_name: category_name,
          category_img: req.file.filename,
        });

        return res.status(200).send({ data: category });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }
}
