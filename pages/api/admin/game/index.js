import unzipper from "unzipper";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import fsPromises from "fs/promises";
import { gameUpload } from "@/helpers/gameUpload";

const db = require("@/config/dbConfig");

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

    return res.status(200).send(data);
  } else if (req.method === "POST") {
    gameUpload()(req, res, async (err) => {
      if (err) {
        return res.status(200).send({ status: false, error: err.message });
      }

      const thumbnail = req.files.gm_thumbnail
        ? req.files.gm_thumbnail[0].filename
        : null;

      const gameFolder = req.files.gm_folder
        ? req.files.gm_folder[0].filename
        : null;

      const {
        description,
        title,
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
            return res.status(500).send({
              status: false,
              message: "Failed to delete the zip file",
              details: unlinkErr.message,
            });
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

        // Save the game record in the database
        const createdGame = await Game.create(game);

        return res.status(200).send({
          status: true,
          message: "Game added successfully",
          data: createdGame,
        });
      } catch (unzipErr) {
        res.status(500).send({
          error: "Failed to unzip the file",
          details: unzipErr.message,
        });
      }
    });
  } else if (req.method === "PATCH") {
    const { id, ad_show, game_show } = req.query;

    const game = await Game.findOne({ where: { id } });

    if (!game) {
      return res.status(200).send({ status: false, message: "Game not found" });
    }

    const toBeUpdated = {};

    toBeUpdated.ad_status =
      ad_show === "true" ? true : ad_show === "false" ? false : game.ad_status;

    toBeUpdated.game_status =
      game_show === "true"
        ? true
        : game_show === "false"
        ? false
        : game.game_status;

    await game.update(toBeUpdated);

    return res.status(200).send({
      status: true,
      message: "Updated successfully",
    });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
