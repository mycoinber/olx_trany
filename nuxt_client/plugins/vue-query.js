import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const { app } = nuxtApp;

  const queryClient = new QueryClient();

  app.provide(QueryClientProvider, queryClient);
});
