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
        console.log(username, password);
        // Отправляем запрос на сервер для авторизации
        const response = await instance.post("/login", {
          username,
          password,
        });
        console.log(response);
        // Если авторизация прошла успешно, сохраняем пользователя в состоянии
        if (response.data.success) {
          this.user = response.data.user;
          this.isAuthenticated = true;
          console.log('Login successful');
        } else {
          // Обрабатываем ошибку авторизации
          console.error("Ошибка авторизации:", response.data.message);
        }
      } catch (error) {
        // Обрабатываем ошибку сети
        console.error("Ошибка сети:", error);
      }
    },
    async register(username: string, password: string, firstName: string, lastName: string, email: string, phone: string) {
      try {
        console.log(username, password, firstName, lastName, email, phone);
        // Отправляем запрос на сервер для авторизации
        const response = await instance.post("/register", {
          username,
          password,
          firstName,
          lastName,
          email,
          phone,
        });
        console.log(response);
        // Если авторизация прошла успешно, сохраняем пользователя в состоянии
        if (response.data.success) {
          this.user = response.data.user;
          this.isAuthenticated = true;
          console.log('Login successful');
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
