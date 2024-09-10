// middleware/auth.js
import { callWithNuxt } from "#app";
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;

  const nuxtApp = useNuxtApp();
  const authStore = useAuthStore();
  await authStore.initialize(); // Ждем выполнения промиса

  if (!authStore.isAuthenticated) {
    return callWithNuxt(nuxtApp, navigateTo, ["/login"]);
  }

  // if (authStore.getIsAuthenticated && authStore.getUser?.role !== "admin") {
  //   alert("Доступ разрешен только для администраторов");
  //   return navigateTo("/");
  // }
});
