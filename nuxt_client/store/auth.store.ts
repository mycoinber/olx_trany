import { defineStore } from "pinia";
import Cookies from "js-cookie";
import instance from "../utils/axios";

interface User {
  name: string;
  email: string;
  role: string;
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
    async initialize() {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await instance.get("/user/me");
          if (response.data.success) {
            this.user = response.data.user;
            this.isAuthenticated = true;
          }
        } catch (error) {
          console.error("Ошибка сети:", error);
        }
      }
    },
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
          Cookies.set("token", response.data.token);
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
          Cookies.set("token", response.data.token);
          return response.data.success;
        } else {
          console.error("Ошибка авторизации:", response.data.message);
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
      }
    },
    async confirmEmail(token: string) {
      try {
        const response = await instance.post("/user/confirm-email", {
          token,
        });

        if (response.data.success) {
          // Дополнительные действия при успешном подтверждении email
        } else {
          console.error("Ошибка подтверждения email:", response.data.message);
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      Cookies.remove("token");
    },
  },
});
