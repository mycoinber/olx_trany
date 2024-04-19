// ~/store/auth.ts
import { defineStore } from "pinia";
import instance from "../plugins/axios";

interface User {
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
  actions: {
    async login(username: string, password: string) {
      try {
        // Отправляем запрос на сервер для авторизации
        const response = await instance.post("/user/login", {
          username,
          password,
        });

        // Если авторизация прошла успешно, сохраняем пользователя в состоянии
        if (response.data.success) {
          this.user = response.data.user;
          this.isAuthenticated = true;
        } else {
          // Обрабатываем ошибку авторизации
          console.error("Ошибка авторизации:", response.data.message);
        }
      } catch (error) {
        // Обрабатываем ошибку сети
        console.error("Ошибка сети:", error);
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
