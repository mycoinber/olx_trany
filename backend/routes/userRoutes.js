const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Получение всех пользователей
router.get('/', UserController.getUsers);

// Получение пользователя по ID
router.get('/:userId', UserController.getUserById);

// Создание нового пользователя
router.post('/', UserController.createUser);
router.post('/register', UserController.registerUser);

// // Обновление информации о пользователе по ID
router.put('/:userId', UserController.updateUser);

// // Обновление информации о пользователе по ID
router.put('/changepassword/:userId', UserController.updateUserPwd);

// // Удаление пользователя по ID
router.delete('/:userId', UserController.deleteUser);

module.exports = router;