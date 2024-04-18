// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/scss/main.scss"],
  modules: ["@nuxt/image", "nuxt-icon", "@pinia/nuxt", "@nuxtjs/google-fonts"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/scss/variables/_variables.scss" as *;',
        },
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
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
  
});
