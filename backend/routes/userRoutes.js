const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { verifyToken, verifyRole } = require("../middleware/verifyToken");
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
// Получение всех пользователей
router.get("/", UserController.getUsers);

// Получение пользователя по ID
router.get("/:userId", UserController.getUserById);

// Создание нового пользователя
router.post("/", UserController.createUser);

//Логин
router.post("/login", UserController.loginUser);

// Регистрация
router.post("/register", UserController.registerUser);

// // Обновление информации о пользователе по ID
router.put("/:userId", upload.single("media"), UserController.updateUser);

// // Обновление информации пароля о пользователе по ID
router.put("/changepassword/:userId", UserController.updateUserPwd);

// // Удаление пользователя по ID
router.delete("/:userId", UserController.deleteUser);

module.exports = router;
