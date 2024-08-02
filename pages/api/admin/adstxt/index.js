import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const adsTxtPath = path.join(process.cwd(), "public", "ads.txt");
  if (req.method === "GET") {
    try {
      fs.readFile(adsTxtPath, "utf8", (err, data) => {
        if (err) {
          return res
            .status(200)
            .send({ status: false, message: "Error reading ads.txt" });
        }
        return res
          .status(200)
          .send({ status: true, message: "Ads.txt loaded", content: data });
      });
    } catch (error) {
      return res.status(200).send({ status: false, message: "Error occurred" });
    }
  } else if (req.method === "POST") {
    const { content } = req.body;
    try {
      fs.writeFile(adsTxtPath, content, "utf8", (err) => {
        if (err) {
          return res
            .status(200)
            .send({ status: false, message: "Error writing to ads.txt" });
        }
        return res
          .status(200)
          .send({ status: true, message: "ads.txt updated successfully" });
      });
    } catch (error) {
      return res.status(200).send({ status: false, message: "Error occurred" });
    }
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failes" });
  }
}
