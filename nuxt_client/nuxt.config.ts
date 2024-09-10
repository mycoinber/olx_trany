// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/scss/main.scss"],
  modules: [
    "@nuxt/image",
    "nuxt-icon",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/content",
  ],
  content: {
    api: { baseURL: "/_content" },
    watch: false,
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/scss/variables/_variables.scss" as *;',
        },
      },
    },
  },
  routeRules: {
    "/": {
      ssr: true, // Главная страница будет рендериться на сервере
    },
    myaccount: {
      ssr: false,
    },
  },
  googleFonts: {
    families: {
      Montserrat: {
        wght: [300, 400, 700],
      },
    },
  },
  pinia: {
    storesDirs: ["./store/**"],
  },
  runtimeConfig: {
    public: {
      backHost: process.env.BACK_HOST || "http://localhost:3001",
    },
  },
  plugins: ["~/plugins/vue-query.ts"],
  image: {
    providers: {
      myCustom: {
        provider: "~/providers/customProvider.ts",
        options: { baseURL: process.env.BACK_HOST || "http://localhost:3001" },
      },
    },
    // Укажите провайдера по умолчанию, если нужно
    defaultProvider: "myCustom",
  },
});
