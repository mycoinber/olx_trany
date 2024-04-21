const Category = require('../models/userModels');


// Контроллер для создания нового пользователя
const createCategory = async (req, res) => {

    const {
        title,
        description,
        slug,

    } = req.body;

    try {
        // Проверяем, существует ли пользователь с таким же email или username
        const existingUser = await User.findOne({
            $or: [{
                username
            }, {
                email
            }]
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'Пользователь с таким именем пользователя или email уже существует'
            });
        }

        // Создаем нового пользователя
        const newUser = new User({
            title,
            description,
            slug,

        });
        await newUser.save();

        res.status(201).json({
            message: 'Пользователь успешно создан',
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова'
        });
    }
};


module.exports = {
    createCategory
};