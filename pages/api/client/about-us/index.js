import db from "@/config/dbConfig";

const AboutUs = db.aboutus;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await AboutUs.findAll({});
    return res.status(200).send({ status: true, data });
  }
}
