import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function uploadSingle(dest, fieldName = "file") {
  return (req, res, next) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadDir = `uploads/${dest}`;
        ensureDirectoryExists(uploadDir);
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        cb(
          null,
          `IMG-${crypto.randomBytes(12).toString("hex")}${path.extname(
            file.originalname
          )}`
        );
      },
    });

    const upload = multer({
      storage,
      fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/jpg", "image/png"];
        if (allowed.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("Only .jpeg, .jpg, .png formats allowed"), false);
        }
      },
    }).single(fieldName);

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).send({ error: err.message });
      }
      next();
    });
  };
}
