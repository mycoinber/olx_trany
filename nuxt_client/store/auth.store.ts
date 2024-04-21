import { defineStore } from "pinia";
import Cookies from "js-cookie"; // Импортируем библиотеку js-cookie
// const { instance } = useNuxtApp();
import instance from "~/utils/axios";

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
    async register(
      username: string,
      email: string,
      password: string,
      phone: string,
      firstName: string,
      lastName: string
    ) {
      try {
        const response = await instance.post("/user/register", {
          username,
          email,
          password,
          phone,
          firstName,
          lastName,
        });

        if (response.data.success) {
          this.user = response.data.user;
          this.isAuthenticated = true;
          Cookies.set("token", response.data.token); // Устанавливаем токен в куки
          console.log("Registration successful");
          return response.data.success;
        } else {
          console.error("Ошибка регистрации:", response.data.message);
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
      }
    },
    async login(usernameOrEmail: string, password: string) {
      try {
        const response = await instance.post("/user/login", {
          usernameOrEmail,
          password,
        });

        if (response.data.success) {
          this.user = response.data.user;
          this.isAuthenticated = true;
          Cookies.set("token", response.data.token); // Устанавливаем токен в куки
          console.log("Login successful");
        } else {
          console.error("Ошибка авторизации:", response.data.message);
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      Cookies.remove("token"); // Удаляем токен из куки
    },
  },
});
