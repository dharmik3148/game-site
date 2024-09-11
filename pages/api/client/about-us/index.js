import db from "@/config/dbConfig";
import { where } from "sequelize";

const AboutUs = db.aboutus;
const PageAd = db.pageads;
const Ads = db.ad;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await AboutUs.findAll({});
    const ad_data = await PageAd.findOne({
      where: { page_type: "about-us" },
      attributes: ["page_type", "ad_status"],
      include: [
        {
          model: Ads,
        },
      ],
    });
    return res.status(200).send({ status: true, data, ad_data });
  } else {
    return res.status(200).send({ status: false, message: "Not Allowed !!" });
  }
}
