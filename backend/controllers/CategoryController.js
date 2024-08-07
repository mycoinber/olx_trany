const Category = require("../models/categoryModels");
const CategoryField = require("../models/categoryFieldModels");
const fs = require("fs");
const path = require("path");

// Создание новой категории
const createCategory = async (req, res) => {
  const { title, description, parentID, categoryFields } = req.body;
  const photo = req.file ? req.file.path : null;

  try {
    // Проверяем существует ли категория с таким же названием
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with this title already exists" });
    }

    // Создаем новую категорию
    const newCategory = new Category({
      title,
      description,
      parentID,
      photo: photo ? "/category_images/" + path.basename(photo) : null,
    });

    // Сохраняем категорию
    const savedCategory = await newCategory.save();

    // Создаем метаполя для категории, если они переданы
    if (categoryFields && categoryFields.length > 0) {
      const savedCategoryFields = await CategoryField.insertMany(
        categoryFields.map((field) => ({
          category: savedCategory._id,
          name: field,
        }))
      );
      savedCategory.metaFields = savedCategoryFields.map((field) => field._id);
      await savedCategory.save();
    }

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение всех категорий
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение категории по ID
const getCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const categoryFields = await CategoryField.find({
      category: category._id,
    });
    const categoryWithFields = {
      _id: category._id,
      title: category.title,
      description: category.description,
      parentID: category.parentID,
      photo: category.photo,
      slug: category.slug,
      categoryFields: categoryFields,
    };
    res.json(categoryWithFields);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение категории по Slug
const getCategoryBySlug = async (req, res) => {
  const categorySlug = req.params.categorySlug;
  try {
    const category = await Category.findOne({ slug: categorySlug }).populate(
      "CategoryField"
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Обновление категории по ID
const updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const { name } = req.body;
  const { categoryImage } = req.file; // Получаем путь к загруженному изображению

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, image: categoryImage }, // Обновляем имя и изображение категории
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Удаление категории по ID
const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    await CategoryField.deleteMany({ category: categoryId });
    // Удаляем изображение категории, если оно существует
    if (deletedCategory.photo) {
      fs.unlinkSync(path.join(__dirname, "..", deletedCategory.photo));
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
