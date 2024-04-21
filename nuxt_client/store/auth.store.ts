import { defineStore } from "pinia";
const { $axios } = useNuxtApp();

interface User {
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    token: null as string | null, // Добавляем токен в состояние
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
    getToken(state) {
      return state.token; // Добавляем геттер для токена
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
        const response = await $axios.post("/user/register", {
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
          this.token = response.data.token; // Сохраняем токен
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
        const response = await $axios.post("/user/login", {
          usernameOrEmail,
          password,
        });

        if (response.data.success) {
          this.user = response.data.user;
          this.isAuthenticated = true;
          this.token = response.data.token; // Сохраняем токен
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
      this.token = null; // Очищаем токен
    },
  },
});
