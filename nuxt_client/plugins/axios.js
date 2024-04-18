import axios from "axios";
import Cookies from "js-cookie";

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000", // Укажите ваш базовый URL здесь
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

  // Добавляем экземпляр axios в nuxtApp
  nuxtApp.provide("axios", instance);
});
