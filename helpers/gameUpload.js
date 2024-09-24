import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function gameUpload() {
  return (req, res, next) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        let uploadDir;
        if (file.fieldname === "gm_thumbnail") {
          uploadDir = "uploads/thumbnails";
        } else if (file.fieldname === "gm_folder") {
          uploadDir = "uploads/games";
        } else {
          return cb(new Error("Invalid file field"), false);
        }

        ensureDirectoryExists(uploadDir);

        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        let prefix;
        if (file.fieldname === "gm_thumbnail") {
          prefix = `IMG-${crypto.randomBytes(12).toString("hex")}`;
        } else if (file.fieldname === "gm_folder") {
          const folderName = req.body.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .trim();

          prefix = `${folderName}-${crypto.randomBytes(6).toString("hex")}`;
        } else {
          return cb(new Error("Invalid file field"), false);
        }
        cb(null, `${prefix}${path.extname(file.originalname)}`);
      },
    });

    const upload = multer({
      storage,
      fileFilter: (req, file, cb) => {
        if (file.fieldname === "gm_thumbnail") {
          const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
          if (allowedImageTypes.includes(file.mimetype)) {
            cb(null, true);
          } else {
            cb(
              new Error(
                "Only .jpeg, .jpg, .png formats allowed for gm_thumbnail"
              ),
              false
            );
          }
        } else if (file.fieldname === "gm_folder") {
          if (
            file.mimetype === "application/zip" ||
            file.mimetype === "application/x-zip-compressed"
          ) {
            cb(null, true);
          } else {
            cb(new Error("Only .zip formats allowed for gm_folder"), false);
          }
        } else {
          cb(new Error("Invalid file field"), false);
        }
      },
    }).fields([
      {
        name: "gm_thumbnail",
        maxCount: 1,
      },
      {
        name: "gm_folder",
        maxCount: 1,
      },
    ]);

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).send({ error: err.message });
      }
      next();
    });
  };
}
