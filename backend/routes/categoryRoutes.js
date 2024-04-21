const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/")); // Укажите путь к директории для загрузки файлов
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      new Date().toISOString().replace(/:/g, "-") +
      "-" +
      file.originalname.replace(/\s/g, "-");
    cb(null, uniqueSuffix);
    req.filepath = "/uploads/" + uniqueSuffix; // Сохраняем относительный путь
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image or video file!"), false);
    }
  },
  limits: {
    fileSize: function (req, file, cb) {
      if (file.mimetype.startsWith("image/")) {
        return 4 * 1024 * 1024; // 4MB
      } else if (file.mimetype.startsWith("video/")) {
        return 200 * 1024 * 1024; // 200MB
      }
    },
  },
});

// Получение всех категорий
router.get("/", CategoryController.getAllCategories);

// Получение категории по ID
router.get("/:categoryId", CategoryController.getCategoryById);

// Получение категории по Slug
router.get("/:categorySlug", CategoryController.getCategoryBySlug);

// Создание новой категории
router.post("/", CategoryController.createCategory);

// Обновление информации о категории по ID
router.put(
  "/:categoryId",
  upload.single("media"),
  CategoryController.updateCategory
);

// Удаление категории по ID
router.delete("/:categoryId", CategoryController.deleteCategory);

module.exports = router;
