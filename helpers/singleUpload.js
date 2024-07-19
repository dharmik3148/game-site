import multer from "multer";
import path from "path";
import crypto from "crypto";

export const uploadSingle = (dest, fieldName = "file") => {
  return (req, res, next) => {
    const mult = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, `public/uploads/${dest}`);
        },
        filename: (req, file, cb) => {
          cb(
            null,
            `IMG-${crypto.randomBytes(12).toString("hex")}${path.extname(
              file.originalname
            )}`
          );
        },
      }),

      fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/jpg", "image/png"];
        if (allowed.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(null, false);
          cb(new Error("Only .jpeg, .jpg, .png formats allowed"));
        }
      },
    }).single(fieldName);

    mult(req, res, (err) => {
      if (err) {
        return res.status(400).send({ error: err.message });
      }
      next();
    });
  };
};
