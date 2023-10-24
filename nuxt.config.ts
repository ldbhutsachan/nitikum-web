// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  components: true,
  css: ["@/assets/fonts/style.css","@mdi/font/css/materialdesignicons.css", "vuetify/styles/main.sass"],
  build: {
    transpile: ["vuetify"], //"@vuepic/vue-datepicker"
  },
  modules: [
    '@pinia/nuxt',
  ],
  plugins: ["~/plugins/vuetify.ts"],
})
