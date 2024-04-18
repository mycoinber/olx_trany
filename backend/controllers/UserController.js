const User = require('../models/userModels');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Предполагаем, что у вас есть модель User для работы с базой данных

// const User = require('../models/User');

async function getUsers(req, res) {
    console.log("test");
    res.status(200).json({
        user: "users",
    });
}


// Контроллер для создания нового пользователя
const createUser = async (req, res) => {

    const {
        username,
        email,
        password,
        fullName,
        age,
        phone,
        descr,
        firstName,
        lastName,
        role,
        logo,
        subscription
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
            username,
            email,
            password,
            fullName,
            age,
            descr,
            phone,
            firstName,
            lastName,
            role,
            logo,
            subscription
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

const registerUser = async (req, res) => {
    // console.log(req);
    const {
        username,
        email,
        password,
        fullName,
        age,
        phone,
        descr,
        firstName,
        lastName,
        role,
        logo,
        subscription
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
            res.status(400).json({
                message: 'Пользователь с таким именем пользователя или email уже существует'
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        // Создаем нового пользователя
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            fullName,
            age,
            phone,
            descr,
            firstName,
            lastName,
            role,
            logo,
            subscription
        });
        await newUser.save();

        res.status(201).json({
            message: 'Пользователь успешно создан',
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
            error: error
        });
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.userId;
    console.log("test userID: ", userId);
    try {

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({
                message: 'Пользователь не найден'
            });
            return;
        }

        res.status(200).json({
            message: 'Данные пользователя успешно получены',
            user: user
        });
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error);
        return res.status(500).json({
            message: 'Произошла ошибка при получении данных пользователя'
        });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const newUserData = req.body;
    try {
        if (!req.body.password) {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $set: newUserData
            }, {
                new: true
            });
            if (!updatedUser) {
                return res.status(404).json({
                    message: 'Пользователь не найден'
                });
            }
            res.status(200).json({
                message: 'Данные пользователя успешно обновлены (без изменения пароля)',
                user: updatedUser
            });
        } else {
            console.log("Есть пароль");
            res.status(400).json({
                message: 'Нельзя изменять пароль с помощью этого метода'
            });
        }
    } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        return res.status(500).json({
            message: 'Произошла ошибка при обновлении данных пользователя'
        });
    }
};

const updateUserPwd = async (req, res) => {
    const userId = req.params.userId;
    const {
        password,
        oldPassword
    } = req.body;
    console.log(password, oldPassword, userId)
    try {
        const user = await User.findById(
            userId
        );
        console.log(user);
        // Проверяем, что oldPassword соответствует старому паролю пользователя
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Старый пароль неверен'
            });
        }

        // Хешируем новый пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Обновляем пароль пользователя
        const updatedUserPwd = await User.findByIdAndUpdate(userId, {
            $set: {
                password: hashedPassword
            }
        }, {
            new: true
        });

        return res.status(200).json({
            message: 'Пароль успешно изменен'
        });
    } catch (error) {
        console.error('Ошибка при обновлении пароля:', error);
        return res.status(500).json({
            message: 'Произошла ошибка при обновлении данных пароля'
        });
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }

        // Обновляем статус пользователя на false
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: {
                status: false
            }
        }, {
            new: true
        });

        return res.status(200).json({
            message: 'Статус пользователя успешно обновлен',
            user: updatedUser
        });
    } catch (error) {
        console.error('Ошибка при обновлении статуса пользователя:', error);
        return res.status(500).json({
            message: 'Произошла ошибка при обновлении статуса пользователя'
        });
    }
}


module.exports = {
    getUsers,
    createUser,
    registerUser,
    getUserById,
    updateUser,
    updateUserPwd,
    deleteUser,

};