const express = require("express");
const router = express.Router();
const CategoryFieldController = require("../controllers/CategoryFieldController");

// Создание нового поля категории
router.post("/", CategoryFieldController.createCategoryField);

// Получение всех полей категории
router.get("/", CategoryFieldController.getAllCategoryFields);

// Получение всех полей категории
router.get(
  "/cat/:categoryId",
  CategoryFieldController.getAllCategoryFieldsByCategoryId
);

// Получение поля категории по ID
router.get("/:categoryFieldId", CategoryFieldController.getCategoryFieldById);

// Обновление поля категории по ID
router.put("/:categoryFieldId", CategoryFieldController.updateCategoryField);

// Удаление поля категории по ID
router.delete("/:categoryFieldId", CategoryFieldController.deleteCategoryField);

module.exports = router;
