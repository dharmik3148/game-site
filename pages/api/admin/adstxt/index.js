import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const adsTxtPath = path.join(process.cwd(), "public", "ads.txt");
  if (req.method === "GET") {
    const adsTxtPath = path.join(process.cwd(), "public", "ads.txt");

    fs.readFile(adsTxtPath, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          const defaultAdsTxtContent = "WRITE HERE";
          fs.writeFile(adsTxtPath, defaultAdsTxtContent, "utf8", (writeErr) => {
            if (writeErr) {
              return res
                .status(200)
                .send({ status: false, message: "Error creating ads.txt" });
            }
            return res.status(200).send({
              status: true,
              message: "Ads.txt created",
              content: defaultAdsTxtContent,
            });
          });
        } else {
          return res
            .status(200)
            .send({ status: false, message: "Error reading ads.txt" });
        }
      } else {
        return res
          .status(200)
          .send({ status: true, message: "Ads.txt loaded", content: data });
      }
    });
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
