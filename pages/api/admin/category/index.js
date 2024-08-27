import db from "@/config/dbConfig";
const Category = db.category;
const Game = db.game;
const { uploadSingle } = require("@/helpers/singleUpload");
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
    const data = await Category.findAll({});
    return res.status(200).send(data);
  } else if (req.method === "POST") {
    uploadMiddleware(req, res, async () => {
      if (!req.file) {
        return res
          .status(200)
          .send({ status: false, message: "No file uploaded" });
      }

      const { category_name } = req.body;

      try {
        // BELOW CODE WROTE TO MATCH CAT_NAME BEFORE CREATEING BUT LATER DECIDED TO SEARCH WIT ID NOT BY NAME
        // const findCat = await Category.findOne({ where: { category_name } });

        // if (findCat) {
        //   return res.status(200).send({
        //     status: false,
        //     message: `${category_name} already available`,
        //   });
        // }

        const category = await Category.create({
          category_name: category_name.trim(),
          category_img: req.file.filename,
        });

        return res
          .status(200)
          .send({ status: true, message: "New category added", category });
      } catch (error) {
        return res.status(200).send({ status: false, message: error.message });
      }
    });
  } else if (req.method === "DELETE") {
    const { id } = req.headers;
    const category = await Category.findOne({
      where: { id },
    });
    if (!category) {
      return res
        .status(200)
        .send({ status: false, message: "Category not found" });
    }

    const associatedGames = await Game.findOne({
      where: { categoryId: id },
    });

    if (associatedGames) {
      return res.status(200).send({
        status: false,
        message:
          "Cannot delete category, there are games associated with this category",
      });
    }

    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "category",
      category.img_path
    );

    fs.unlink(filePath, async (err) => {
      if (err) {
        return res
          .status(200)
          .send({ status: false, message: "Failed to delete the file" });
      }

      await Category.destroy({ where: { id: category.id } });
    });

    return res.status(200).send({ status: true, message: "Category deleted" });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
