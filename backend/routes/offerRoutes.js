const express = require("express");
const router = express.Router();
const OfferController = require("../controllers/OfferController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const uploadPath = path.join(__dirname, `../public/${year}-${month}/`);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      new Date().toISOString().replace(/:/g, "-") +
      "-" +
      file.originalname.replace(/\s/g, "-");
    cb(null, uniqueSuffix);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image or video file!"), false);
  }
};

const limits = {
  fileSize: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      return 4 * 1024 * 1024; // 4MB
    } else if (file.mimetype.startsWith("video/")) {
      return 200 * 1024 * 1024; // 200MB
    }
  },
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

// Получение всех офферов
router.get("/", OfferController.getAllOffers);

// Получение оффера по ID
router.get("/:offerId", OfferController.getOfferById);

// Создание нового оффера
router.post("/", upload.array("images", 10), OfferController.createOffer); // Максимум 10 изображений

// Обновление информации об оффере по ID
router.put(
  "/:offerId",
  upload.array("images", 10),
  OfferController.updateOffer
); // Максимум 10 изображений

// Удаление оффера по ID
router.delete("/:offerId", OfferController.deleteOffer);

module.exports = router;
