import db from "@/config/dbConfig";
import { upload } from "@/helpers/gameUpload";
import unzipper from "unzipper";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import crypto from "crypto";

const Game = db.game;
const Ads = db.ad;
const Category = db.category;
const GameType = db.game_type;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await Game.findAll({
      include: [
        {
          model: Ads,
        },
        {
          model: Category,
          attributes: ["category_name", "category_img"],
        },
        {
          model: GameType,
          attributes: ["name", "type_img"],
        },
      ],
    });

    return res.status(200).json(data);
  } else if (req.method === "POST") {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ error: err.message });
      }

      const thumbnail = req.files.gm_thumbnail
        ? req.files.gm_thumbnail[0].filename
        : null;
      const gameFolder = req.files.gm_folder
        ? req.files.gm_folder[0].filename
        : null;

      const {
        title,
        description,
        played_count,
        page_title,
        meta_description,
        ad_status,
        game_status,
        adId,
        categoryId,
        game_typeId,
      } = req.body;

      let folderName = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .trim();
      folderName = `${folderName}-${crypto.randomBytes(5).toString("hex")}`;

      try {
        let extractDirName;
        if (gameFolder) {
          const zipPath = path.join(
            process.cwd(),
            "public/uploads/games",
            gameFolder
          );

          // Extract base name from zip file for directory
          extractDirName = path.basename(gameFolder, path.extname(gameFolder));
          const extractPath = path.join(
            process.cwd(),
            "public/uploads/games",
            extractDirName
          );

          // Ensure the extraction directory exists
          await fsPromises.mkdir(extractPath, { recursive: true });

          // Create a read stream for the zip file
          const readStream = fs.createReadStream(zipPath);

          // Unzip the file and wait for it to complete
          await new Promise((resolve, reject) => {
            readStream
              .pipe(unzipper.Extract({ path: extractPath }))
              .on("finish", () => {
                readStream.destroy();
                resolve();
              })
              .on("error", (err) => {
                readStream.destroy();
                reject(err);
              });
          });

          // Remove the zip file after extraction
          try {
            await fsPromises.unlink(zipPath);
          } catch (unlinkErr) {
            res.status(500).send({
              error: "Failed to delete the zip file",
              details: unlinkErr.message,
            });
            return;
          }
        }

        const game = {
          thumbnail: thumbnail,
          title,
          description,
          played_count,
          page_title,
          meta_description,
          adId,
          categoryId,
          game_status,
          ad_status,
          game_typeId,
          game_path: extractDirName,
        };

        const createdGame = await Game.create(game);
        res.status(200).send(createdGame);
      } catch (unzipErr) {
        // If unzip fails, send error response without attempting to delete the zip file
        res.status(500).send({
          error: "Failed to unzip the file",
          details: unzipErr.message,
        });
      }
    });
  } else if (req.method === "PUT") {
    // Handle PUT request
  } else if (req.method === "DELETE") {
    // Handle DELETE request
  } else {
    res.status(200).send({ status: false, message: "Authorization failed" });
  }
}
