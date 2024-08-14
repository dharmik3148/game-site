const db = require("@/config/dbConfig");

const AboutUs = db.aboutus;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const data = await AboutUs.findOne({ where: { id } });

    if (!data) {
      return res.status(200).send({ status: false, message: "No Data Found" });
    }

    return res
      .status(200)
      .send({ status: true, message: "AboutUs entry found", data });
  } else if (req.method === "PATCH") {
    const { id, heading, content } = req.body;

    const item = await AboutUs.findOne({ where: { id } });

    if (!item) {
      return res.status(200).send({ status: false, message: "No Data Found" });
    }

    const update = await AboutUs.update(
      { heading: heading.trim(), content: content.trim() },
      { where: { id } }
    );

    if (update === 0) {
      return res
        .status(200)
        .send({ status: false, message: "No Data Found or No Changes Made" });
    }

    const updatedData = await AboutUs.findOne({ where: { id } });

    return res
      .status(200)
      .send({ status: true, message: "Content updated", data: updatedData });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
