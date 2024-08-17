import { uploadSingle } from "@/helpers/singleUpload";

const db = require("@/config/dbConfig");
const Category = db.category;
const fs = require("fs");
const path = require("path");

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = uploadSingle("category", "cat_img");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const data = await Category.findOne({ where: { id } });

    if (!data) {
      return res.status(200).send({ status: false, message: "No Data Found" });
    }

    return res
      .status(200)
      .send({ status: true, message: "Category entry found", data });
  } else if (req.method === "PATCH") {
    const { id } = req.query;

    const cat = await Category.findOne({ where: { id } });

    if (!cat) {
      return res
        .status(200)
        .send({ status: false, message: "Category not found" });
    }

    uploadMiddleware(req, res, async () => {
      const { category_name } = req.body;

      try {
        if (req.file) {
          const oldFilePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            "category",
            cat.img_path
          );

          fs.unlinkSync(oldFilePath);

          cat.category_img = req.file.filename;
        }

        if (category_name) {
          cat.category_name = category_name.trim();
        }

        await cat.save();

        return res.status(200).send({
          status: true,
          message: "Category updated",
          data: cat,
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
