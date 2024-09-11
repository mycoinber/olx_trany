const jwt = require("jsonwebtoken");

// Middleware для проверки токена
async function verifyToken(req, res, next) {
  // Получаем токен из заголовка запроса
  const token = req.headers.authorization.split(" ")[1];

  // Проверяем наличие токена
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    // Проверяем токен на валидность и срок действия
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });

    console.log("Verify token user data:", decoded);
    // Проверяем, не истек ли срок действия токена
    const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
    if (decoded.exp < currentTime) {
      res.status(401).json({ message: "Token expired" });
      return;
    }

    // Если токен валиден, сохраняем информацию о пользователе в объекте запроса
    req.user = decoded;
    next(); // Переходим к следующему middleware
  } catch (err) {
    res.status(401).json({ message: "Token expired or invalid" });
    return;
  }
}

function verifyRole(req, res, next, roles = []) {
  try {
    // Получаем роль пользователя из объекта запроса
    const userRole = req.user.role;

    // Проверяем, разрешена ли роль пользователя для доступа
    if (roles.length && !roles.includes(userRole)) {
      res.status(403).json({ message: "Access forbidden" });
      return;
    }

    // Если доступ разрешен всем или у пользователя есть разрешенная роль, пропускаем запрос дальше
    next();
  } catch (error) {
    console.error("Error verifying role:", error.message);
    res.status(500).json({ message: "An error occurred while verifying role" });
  }
}

module.exports = { verifyToken, verifyRole };
