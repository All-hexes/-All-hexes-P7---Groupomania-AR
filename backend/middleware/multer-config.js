const multer = require("multer");
const { v4: imgID } = require("uuid");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null, "post_" + imgID() + "." + extension);
  },
});

module.exports = multer({ storage }).single("image");
