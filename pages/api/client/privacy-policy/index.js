import db from "@/config/dbConfig";

const PrivacyPolicy = db.privacypolicy;
const PageAd = db.pageads;
const Ads = db.ad;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await PrivacyPolicy.findAll({});
    const ad_data = await PageAd.findOne({
      where: { page_type: "privacy-policy" },
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
