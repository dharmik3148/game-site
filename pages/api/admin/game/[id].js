import db from "@/config/dbConfig";
import { gameUpload } from "@/helpers/gameUpload";

import unzipper from "unzipper";
import fs from "fs";
import path from "path";
import fsPromises from "fs/promises";

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
    const { id } = req.query;

    const data = await Game.findOne({
      where: { id: id },

      include: [
        {
          model: Ads,
        },
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: GameType,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!data) {
      return res.status(200).send({
        status: false,
        error: "No game found",
      });
    }

    const ads = await Ads.findAll({ attributes: ["id", "ad_name"] });
    const category = await Category.findAll({
      attributes: ["id", "category_name"],
    });
    const gametype = await GameType.findAll({
      attributes: ["id", "name"],
    });

    // data.played_count += 1;

    // await data.save();

    return res.status(200).json({
      status: true,
      message: "Game entry found",
      game: data,
      groundData: { ads, category, gametype },
    });
  } else if (req.method === "PATCH") {
    const { id } = req.query;

    const game = await Game.findOne({ where: { id } });

    if (!game) {
      return res.status(200).send({ status: false, message: "Game not found" });
    }

    gameUpload()(req, res, async (err) => {
      if (err) {
        return res.status(200).send({ status: false, error: err.message });
      }

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
        game_folder,
        thumbnail_path,
      } = req.body;

      const newThumbnail = req.files.gm_thumbnail
        ? req.files.gm_thumbnail[0].filename
        : null;
      const newGameFolder = req.files.gm_folder
        ? req.files.gm_folder[0].filename
        : null;

      try {
        // Delete old thumbnail if a new one is uploaded
        if (newThumbnail && thumbnail_path) {
          const oldThumbnailPath = path.join(
            process.cwd(),
            "public/uploads/thumbnails",
            thumbnail_path
          );
          await fsPromises.unlink(oldThumbnailPath).catch((err) => {
            return res.status(200).send({
              status: false,
              message: "Failed to delete old thumbnail",
            });
          });
        }

        let extractDirName;

        if (newGameFolder && game_folder) {
          const zipPath = path.join(
            process.cwd(),
            "public/uploads/games",
            newGameFolder
          );

          // Extract base name from zip file for directory
          extractDirName = path.basename(
            newGameFolder,
            path.extname(newGameFolder)
          );
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

          try {
            await fsPromises.unlink(zipPath);
          } catch (unlinkErr) {
            return res.status(200).send({
              status: false,
              message: "Failed to delete the zip file",
            });
          }

          // Delete old game folder if a new one is uploaded
          const oldGameFolderPath = path.join(
            process.cwd(),
            "public/uploads/games",
            game_folder
          );

          await fsPromises
            .rm(oldGameFolderPath, { recursive: true, force: true })
            .catch((err) => {
              return res.status(200).send({
                status: false,
                message: "Failed to delete old game folder",
              });
            });
        }

        const updatedGame = {
          title: title || game.title,
          description: description || game.description,
          played_count: played_count || game.played_count,
          page_title: page_title || game.page_title,
          meta_description: meta_description || game.meta_description,
          ad_status: ad_status !== undefined ? ad_status : game.ad_status,
          game_status:
            game_status !== undefined ? game_status : game.game_status,
          adId: adId || game.adId,
          categoryId: categoryId || game.categoryId,
          game_typeId: game_typeId || game.game_typeId,
          thumbnail: newThumbnail || game.thumbnail_path,
          game_path: extractDirName || game.game_folder,
        };

        await game.update(updatedGame);

        return res.status(200).send({
          status: true,
          message: "Game updated successfully",
        });
      } catch (updateErr) {
        return res.status(200).send({
          status: false,
          message: updateErr.message,
        });
      }
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    const game = await Game.findOne({
      where: { id },
    });

    if (!game) {
      return res.status(200).send({ status: false, message: "Game not found" });
    }

    // DELETE THUMBNAIL
    const deleteThumb = path.join(
      process.cwd(),
      "public/uploads/thumbnails",
      game.thumbnail_path
    );
    await fsPromises.unlink(deleteThumb).catch((err) => {
      return res.status(200).send({
        status: false,
        message: "Failed to delete old thumbnail",
      });
    });

    // DELETE GAME FOLDER
    const deleteGmFolder = path.join(
      process.cwd(),
      "public/uploads/games",
      game.game_folder
    );

    await fsPromises
      .rm(deleteGmFolder, { recursive: true, force: true })
      .catch((err) => {
        return res.status(200).send({
          status: false,
          message: "Failed to delete old game folder",
        });
      });

    await Game.destroy({ where: { id: game.id } });

    return res
      .status(200)
      .send({ status: true, message: "Game deleted successfully" });
  } else {
    return res
      .status(200)
      .send({ status: false, message: "Authorization failed" });
  }
}
