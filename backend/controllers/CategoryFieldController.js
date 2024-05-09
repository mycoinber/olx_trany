const CategoryField = require("../models/categoryFieldModels");

// Создание нового поля категории
const createCategoryField = async (req, res) => {
  const { category, name, type, options } = req.body;

  try {
    const newCategoryField = new CategoryField({
      category,
      name,
      type,
      options,
    });
    const savedCategoryField = await newCategoryField.save();
    res.status(201).json(savedCategoryField);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategoryFieldsByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const categoryFields = await CategoryField.find({ category: categoryId });
    res.json(categoryFields);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение всех полей категории
const getAllCategoryFields = async (req, res) => {
  try {
    const categoryFields = await CategoryField.find();
    res.json(categoryFields);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение поля категории по ID
const getCategoryFieldById = async (req, res) => {
  const categoryFieldId = req.params.categoryFieldId;
  try {
    const categoryField = await CategoryField.findById(categoryFieldId);
    if (!categoryField) {
      return res.status(404).json({ message: "Category field not found" });
    }
    res.json(categoryField);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Обновление поля категории по ID
const updateCategoryField = async (req, res) => {
  const categoryFieldId = req.params.categoryFieldId;
  const { name } = req.body;

  try {
    const updatedCategoryField = await CategoryField.findByIdAndUpdate(
      categoryFieldId,
      { name },
      { new: true }
    );
    if (!updatedCategoryField) {
      return res.status(404).json({ message: "Category field not found" });
    }
    res.json(updatedCategoryField);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Удаление поля категории по ID
const deleteCategoryField = async (req, res) => {
  const categoryFieldId = req.params.categoryFieldId;
  try {
    const deletedCategoryField = await CategoryField.findByIdAndDelete(
      categoryFieldId
    );
    if (!deletedCategoryField) {
      return res.status(404).json({ message: "Category field not found" });
    }
    res.json({ message: "Category field deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategoryField,
  getAllCategoryFields,
  getCategoryFieldById,
  updateCategoryField,
  deleteCategoryField,
  getAllCategoryFieldsByCategoryId,
};
