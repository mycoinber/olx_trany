const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Предполагаем, что у вас есть модель User для работы с базой данных

// const User = require('../models/User');

async function getUsers(req, res) {
  try {
    console.log("test");
    // Получаем всех пользователей из базы данных
    const users = await User.find();

    // Если пользователи найдены, отправляем их в ответе
    res.status(200).json({ data: users });
  } catch (error) {
    // Если произошла ошибка, отправляем сообщение об ошибке в ответе
    console.error("Error while fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

// Контроллер для создания нового пользователя
const createUser = async (req, res) => {
  const { username, email, password, phone, firstName, lastName } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким же email или username
    const existingUser = await User.findOne({
      $or: [
        {
          username,
        },
        {
          email,
        },
      ],
    });
    if (existingUser) {
      return res.status(400).json({
        message:
          "Пользователь с таким именем пользователя или email уже существует",
      });
    }

    // Создаем нового пользователя
    const newUser = new User({
      username,
      email,
      password,
      phone,
      firstName,
      lastName,
    });
    await newUser.save();

    res.status(201).json({
      message: "Пользователь успешно создан",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
    });
  }
};

const registerUser = async (req, res) => {
  // console.log(req);

  const { username, email, password, phone, firstName, lastName } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким же email или username
    const existingUser = await User.findOne({
      $or: [
        {
          username,
        },
        {
          email,
        },
      ],
    });
    if (existingUser) {
      res.status(400).json({
        message:
          "Пользователь с таким именем пользователя или email уже существует",
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
      phone,
      firstName,
      lastName,
    });
    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role, // Добавляем роль в токен
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );

    const emailToken = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h", // Устанавливаем срок действия токена в 24 часа
      }
    );

    console.log(`http://localhost:3000/confirm-email?token=${emailToken}`);

    res.status(201).json({
      message: "Пользователь успешно создан",
      success: true,
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      error: error,
    });
  }
};

const confirmEmail = async (req, res) => {
  try {
    // Извлекаем токен из тела запроса
    const { token } = req.body;

    // Декодируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Находим пользователя по id, который был закодирован в токене
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    // Устанавливаем поле validEmail в true
    user.validEmail = true;
    await user.save();

    res.status(200).json({ message: "Email успешно подтвержден" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  console.log("test userID: ", userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: "Пользователь не найден",
      });
      return;
    }

    res.status(200).json({
      message: "Данные пользователя успешно получены",
      user: user,
    });
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    return res.status(500).json({
      message: "Произошла ошибка при получении данных пользователя",
    });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  let newUserData = req.body;
  let mediaPath = "";
  if (req.file) {
    mediaPath = req.filepath; // Путь к медиафайлу
    newUserData = {
      ...newUserData,
      logo: mediaPath,
    };
  }
  try {
    if (!req.body.password) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: newUserData,
        },
        {
          new: true,
        }
      );
      if (!updatedUser) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }
      res.status(200).json({
        message: "Данные пользователя успешно обновлены (без изменения пароля)",
        user: updatedUser,
      });
    } else {
      console.log("Есть пароль");
      res.status(400).json({
        message: "Нельзя изменять пароль с помощью этого метода",
      });
    }
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
    return res.status(500).json({
      message: "Произошла ошибка при обновлении данных пользователя",
    });
  }
};

const updateUserPwd = async (req, res) => {
  const userId = req.params.userId;
  const { password, oldPassword } = req.body;
  console.log(password, oldPassword, userId);
  try {
    const user = await User.findById(userId);
    console.log(user);
    // Проверяем, что oldPassword соответствует старому паролю пользователя
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Старый пароль неверен",
      });
    }

    // Хешируем новый пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Обновляем пароль пользователя
    const updatedUserPwd = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          password: hashedPassword,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Пароль успешно изменен",
    });
  } catch (error) {
    console.error("Ошибка при обновлении пароля:", error);
    return res.status(500).json({
      message: "Произошла ошибка при обновлении данных пароля",
    });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    // Обновляем статус пользователя на false
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          status: false,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Статус пользователя успешно обновлен",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Ошибка при обновлении статуса пользователя:", error);
    return res.status(500).json({
      message: "Произошла ошибка при обновлении статуса пользователя",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    // Извлекаем данные из тела запроса
    const { usernameOrEmail, password } = req.body;

    // Находим пользователя по email или username
    const user = await User.findOne({
      $or: [
        {
          email: usernameOrEmail,
        },
        {
          username: usernameOrEmail,
        },
      ],
    }).populate("role");

    // Если пользователь не найден, возвращаем ошибку
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Если пароль неверный, возвращаем ошибку
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Создаем JWT токен с ролью пользователя
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role, // Добавляем роль в токен
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );

    // Отправляем ответ с токеном и информацией о пользователе
    res.status(200).json({
      message: "Login successful",
      token,
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role, // Включаем роль пользователя в информацию о пользователе
      },
    });
  } catch (error) {
    // Обрабатываем ошибки
    console.error("Error logging in:", error);
    res.status(500).json({
      message: "An error occurred while logging in",
    });
  }
};

const getMe = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    message: "Login successful",
    success: true,
    user: {
      _id: user.userId,
      email: user.email,
      role: user.role, // Включаем роль пользователя в информацию о пользователе
    },
  });
};

module.exports = {
  getUsers,
  createUser,
  registerUser,
  getUserById,
  updateUser,
  updateUserPwd,
  deleteUser,
  loginUser,
  confirmEmail,
  getMe,
};
