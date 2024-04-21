const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const front = process.env.FRONT;
const allowedOrigins = [front];
const dbuser = process.env.DB_UNAME;
const dbpass = process.env.DB_PWD;
const dbname = process.env.DB_NAME;
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express(); //Создаем приложение
const port = process.env.PORT || 3000; //Указываем порт, если он есть(бэк)

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: function (origin, callback) {
      // Проверка, является ли источник допустимым
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed by CORS"));
      }
    },
  })
);

setTimeout(() => {
  mongoose
    .connect(
      `mongodb://${dbuser}:${dbpass}@olx_mongo:27017/${dbname}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to MongoDB");
      // setupAgenda(); // Вызовите функцию для настройки Agenda
      // initializeRoles();
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
}, 10000);

app.use(express.json());

//Роуты
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);

//прослушка приложения
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
}); //Конец приложения

//mongodb://testolx:testolx123!@localhost:27018/olx?authSource=admin
