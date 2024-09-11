import axios from "axios";
import Cookies from "js-cookie";

// Создаем экземпляр axios

const baseURL = process.server ? "http://olx_back:3001" : process.env.BACK_HOST;

const instance = axios.create({
  baseURL: baseURL, // Укажите ваш базовый URL здесь
});

// Добавляем Axios Interceptor для запросов
instance.interceptors.request.use(
  (config) => {
    // Получаем токен из кук
    const token = Cookies.get("token");

    // Если токен есть, добавляем его в заголовок Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Обрабатываем ошибку
    return Promise.reject(error);
  }
);

// Экспортируем экземпляр axios
export default instance;
