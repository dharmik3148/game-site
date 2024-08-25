import db from "@/config/dbConfig";

const Category = db.category;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await Category.findAll({
      attributes: ["id", "category_img", "category_name"],
    });
    return res.status(200).send({ status: true, data });
  }
}
