import db from "@/config/dbConfig";

const PrivacyPolicy = db.privacypolicy;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await PrivacyPolicy.findAll({});
    return res.status(200).send({ status: true, data });
  } else {
    return res.status(200).send({ status: false, message: "Not Allowed !!" });
  }
}
