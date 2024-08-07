const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const multer = require("multer");
const path = require("path");

// Настройка хранилища для multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/category_images/")); // Указываем путь для сохранения изображений категорий
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      new Date().toISOString().replace(/:/g, "-") +
      "-" +
      file.originalname.replace(/\s/g, "-");
    cb(null, uniqueSuffix);
  },
});

// Фильтр для файлов (только изображения)
const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image file!"), false);
  }
};

// Настройка multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Создание новой категории
router.post(
  "/",
  upload.single("categoryImage"),
  CategoryController.createCategory
);

// Получение всех категорий
router.get("/", CategoryController.getAllCategories);

// Получение категории по ID
router.get("/:categoryId", CategoryController.getCategoryById);

// Получение категории по Slug
router.get("/slug/:categorySlug", CategoryController.getCategoryBySlug);

// Обновление категории по ID
router.put(
  "/:categoryId",
  upload.single("categoryImage"),
  CategoryController.updateCategory
);

// Удаление категории по ID
router.delete("/:categoryId", CategoryController.deleteCategory);

module.exports = router;
