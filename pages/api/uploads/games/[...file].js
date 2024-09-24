import fs from "fs";
import path from "path";
import mime from "mime-types";

export default function handler(req, res) {
  const { file } = req.query;

  const filePath = path.join(process.cwd(), "uploads", "games", ...file);

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath);
      const ext = path.extname(filePath).slice(1);

      const contentType = mime.lookup(ext) || "application/octet-stream";
      res.setHeader("Content-Type", contentType);

      res.status(200).send(fileContent);
    } else {
      res.status(404).send("File not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
}
