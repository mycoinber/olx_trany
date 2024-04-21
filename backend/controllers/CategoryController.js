const Category = require('../models/categoryModels');


// Контроллер для создания новой категории
const createCategory = async (req, res) => {
    const {
        title,
        description,
        slug,
    } = req.body;

    try {

        const existingCategory = await Category.findOne({
            $or: [{
                title
            }, {
                slug
            }]
        });
        if (existingCategory) {
            return res.status(400).json({
                message: 'Категория с таким заголовком, либо слагом уже существует'
            });
        }

        // Создаем нового пользователя
        const newCategory = new Category({
            title,
            description,
            slug,

        });
        await newCategory.save();

        res.status(201).json({
            message: 'Категория успешно создана',
            category: newCategory
        });
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова'
        });
    }
};

// Контроллер для получения категории по айди
const getCategoryById = async (req, res) => {
    const categoryId = req.params.categoryId;
    console.log("test userID: ", categoryId);
    try {

        const category = await Category.findById(categoryId);
        if (!category) {
            res.status(404).json({
                message: 'Категории нет'
            });
            return;
        }

        res.status(200).json({
            message: 'Данные категории успешно получены',
            success: true,
            category: category
        });
    } catch (error) {
        console.error('Ошибка при получении категории:', error);
        return res.status(500).json({
            message: 'Произошла ошибка при получении данных категории'
        });
    }
};
// Контроллер для получения категории по slug
const getCategoryBySlug = async (req, res) => {
    const categorySlug = req.params.slug;
    try {
        const category = await Category.findOne({
            slug: categorySlug
        });

        if (!category) {
            res.status(404).json({
                message: 'Категории не существует'
            });
            return;
        }

        res.status(200).json({
            message: 'Данные категории успешно получены',
            success: true,
            category: category
        });
    } catch (error) {
        console.error('Ошибка при получении категории:', error);
        return res.status(500).json({
            message: 'Произошла ошибка при получении данных категории'
        });
    }
};

// контроллер для получения всех категорий
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({
                message: 'Категории не найдены'
            });
        }

        res.status(200).json({
            message: 'Список категорий успешно получен',
            success: true,
            categories: categories
        });
    } catch (error) {
        console.error('Ошибка при получении списка категорий:', error);
        res.status(500).json({
            message: 'Произошла ошибка при получении списка категорий'
        });
    }
};

// Обновление информации о категории по ID
const updateCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    let newCategoryData = req.body;
    let mediaPath = "";
    if (req.file) {
        mediaPath = req.file.path; // Путь к медиафайлу
        newCategoryData = {
            ...newCategoryData,
            logo: mediaPath
        };
    }
    try {
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
            $set: newCategoryData
        }, {
            new: true
        });

        if (!updatedCategory) {
            return res.status(404).json({
                message: 'Категория не найдена'
            });
        }

        res.status(200).json({
            message: 'Категория успешно обновлена',
            category: updatedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова'
        });
    }
};

// Удаление категории по ID
const deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId;

    try {

        const existingCategory = await Category.findById(categoryId);
        if (!existingCategory) {
            return res.status(404).json({
                message: 'Категория не найдена'
            });
        }


        await existingCategory.remove();

        res.status(200).json({
            message: 'Категория успешно удалена',
            category: existingCategory
        });
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова'
        });
    }
};

module.exports = {
    createCategory,
    getCategoryById,
    getCategoryBySlug,
    getAllCategories,
    updateCategory,
    deleteCategory
};