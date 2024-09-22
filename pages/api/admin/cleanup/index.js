import db from "@/config/dbConfig";
import fs from "fs";
import path from "path";

const Category = db.category;
const GameType = db.game_type;
const Game = db.game;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { type } = req.query;
    try {
      let data = [];
      let dbData = [];

      if (type === "category") {
        data = await Category.findAll({ attributes: ["category_img"] });

        dbData = data.map((item) => {
          const fullUrl = item.category_img;
          return path.basename(fullUrl);
        });
      } else if (type === "gametype") {
        data = await GameType.findAll({ attributes: ["type_img"] });

        dbData = data.map((item) => {
          const fullUrl = item.type_img;
          return path.basename(fullUrl);
        });
      } else if (type === "thumbnails") {
        data = await Game.findAll({ attributes: ["thumbnail"] });

        dbData = data.map((item) => {
          const fullUrl = item.thumbnail;
          return path.basename(fullUrl);
        });
      } else if (type === "games") {
        data = await Game.findAll({ attributes: ["game_path"] });

        dbData = data.map((item) => {
          const fullUrl = item.game_path;
          const regex = /\/games\/([^\/]+)\//;
          const match = fullUrl.match(regex);
          return match ? match[1] : null;
        });
      } else {
        return res
          .status(200)
          .send({ status: false, message: "Invalid Request" });
      }

      const uploadsDir = path.join(process.cwd(), "public", "uploads", type);

      if (!fs.existsSync(path.join(process.cwd(), "public", "uploads"))) {
        return res.status(200).send({
          status: false,
          message: "Uploads directory not found.",
        });
      }

      if (!fs.existsSync(uploadsDir)) {
        return res.status(200).send({
          status: false,
          message: `Directory not found: ${uploadsDir}`,
        });
      }

      const folderData = fs.readdirSync(uploadsDir);

      const dataNotInDb = folderData.filter((item) => !dbData.includes(item));

      if (dataNotInDb.length === 0) {
        return res.status(200).send({
          status: true,
          message: "No Orphaned Files Found",
          type,
          data: dataNotInDb,
        });
      }

      return res.status(200).send({
        status: true,
        message: "Found Orphaned Files",
        type,
        data: dataNotInDb,
      });
    } catch (error) {
      return res.status(200).send({ status: false, message: error.message });
    }
  } else if (req.method === "DELETE") {
    const { type } = req.query;
    try {
      let data = [];
      let dbData = [];

      if (type === "category") {
        data = await Category.findAll({ attributes: ["category_img"] });

        dbData = data.map((item) => {
          const fullUrl = item.category_img;
          return path.basename(fullUrl);
        });
      } else if (type === "gametype") {
        data = await GameType.findAll({ attributes: ["type_img"] });

        dbData = data.map((item) => {
          const fullUrl = item.type_img;
          return path.basename(fullUrl);
        });
      } else if (type === "thumbnails") {
        data = await Game.findAll({ attributes: ["thumbnail"] });

        dbData = data.map((item) => {
          const fullUrl = item.thumbnail;
          return path.basename(fullUrl);
        });
      } else if (type === "games") {
        data = await Game.findAll({ attributes: ["game_path"] });

        dbData = data.map((item) => {
          const fullUrl = item.game_path;
          const regex = /\/games\/([^\/]+)\//;
          const match = fullUrl.match(regex);
          return match ? match[1] : null;
        });
      } else {
        return res
          .status(200)
          .send({ status: false, message: "Invalid Request" });
      }

      const uploadsDir = path.join(process.cwd(), "public", "uploads", type);

      if (!fs.existsSync(path.join(process.cwd(), "public", "uploads"))) {
        return res.status(200).send({
          status: false,
          message: "Uploads directory not found.",
        });
      }

      if (!fs.existsSync(uploadsDir)) {
        return res.status(200).send({
          status: false,
          message: `Directory not found: ${uploadsDir}`,
        });
      }

      const folderData = fs.readdirSync(uploadsDir);

      const dataNotInDb = folderData.filter((item) => !dbData.includes(item));

      if (dataNotInDb.length === 0) {
        return res.status(200).send({
          status: true,
          message: "No Orphaned Files Found",
          type,
          data: dataNotInDb,
        });
      }

      dataNotInDb.forEach((item) => {
        const filePath = path.join(uploadsDir, item);
        try {
          if (fs.statSync(filePath).isDirectory()) {
            fs.rmdirSync(filePath, { recursive: true });
          } else {
            fs.unlinkSync(filePath);
          }
        } catch (error) {
          console.error(`Error deleting ${filePath}:`, error.message);
          return res
            .status(200)
            .send({ status: false, message: error.message });
        }
      });

      return res.status(200).send({
        status: true,
        message: "Orphaned Files Deleted Successfully",
        type,
        data: [],
      });
    } catch (error) {
      return res.status(200).send({ status: false, message: error.message });
    }
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failes" });
  }
}
