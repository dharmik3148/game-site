import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir;
    if (file.mimetype === "application/zip") {
      uploadDir = "public/uploads/games";
    } else if (
      ["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)
    ) {
      uploadDir = "public/uploads/thumbnails";
    } else {
      return cb(new Error("Invalid file type"), null);
    }
    ensureDirectoryExists(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    let prefix;
    if (file.mimetype === "application/zip") {
      const folderName = req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .trim();

      prefix = `${folderName}-${crypto.randomBytes(6).toString("hex")}`;
    } else {
      prefix = `IMG-${crypto.randomBytes(12).toString("hex")}`;
    }
    cb(null, `${prefix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/zip" ||
    ["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

export const upload = multer({ storage, fileFilter }).fields([
  { name: "gm_thumbnail", maxCount: 1 },
  { name: "gm_folder", maxCount: 1 },
]);
