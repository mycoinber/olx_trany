const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  uploadMedia,
  getMedia,
  getAllMedia,
  updateMedia,
  deleteMedia,
  getImage,
} = require("../controllers/mediaController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public")); // Укажите путь к директории для загрузки файлов
  },
  filename: function (req, file, cb) {
    const prefix = new Date().toISOString().replace(/:/g, "-"); // Генерируем уникальный префикс
    const originalname = file.originalname.replace(/[^a-zA-Z0-9.-]/g, ""); // Заменяем пробелы в оригинальном имени файла на дефисы
    const filename = `${prefix}_${originalname}`; // Собираем имя файла с префиксом
    cb(null, filename);
    req.filepath = "/public" + filename; // Сохраняем относительный путь
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: function (req, file, cb) {
      if (file.mimetype.startsWith("image/")) {
        return 4 * 1024 * 1024; // 4MB
      } else if (file.mimetype.startsWith("video/")) {
        return 50 * 1024 * 1024; // 200MB
      }
    },
  },
});

router.post("/upload", upload.single("media"), uploadMedia);
router.get("/media/:id/:size", getMedia);
router.get("/media", getAllMedia);
router.put("/media/:id", updateMedia);
router.delete("/del/:id", deleteMedia);
router.get("/images/:filename", getImage);

module.exports = router;
