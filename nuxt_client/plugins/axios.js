import axios from "axios";
import Cookies from "js-cookie";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Убедитесь, что backurl правильно настроен
  const backurl = import.meta.server
    ? "http://olx_back:3099" // Используйте контейнерный адрес или другой серверный URL
    : config.public.backHost || "http://localhost:3001"; // Клиентский URL

  console.log(backurl);
  const instance = axios.create({
    baseURL: backurl,
  });

  instance.interceptors.request.use(
    (config) => {
      if (import.meta.server) {
        return config; // На сервере не используем токены
      }

      const token = Cookies.get("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("axios", instance);
});
