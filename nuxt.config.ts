// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  components: true,
  css: ["@/assets/fonts/style.css","@mdi/font/css/materialdesignicons.css"],
  modules: [
    '@pinia/nuxt','@invictus.codes/nuxt-vuetify','nuxt-icon'
  ],
  runtimeConfig: {
		API_URL: process.env.baseURL || 'http://localhost:1234'
	},
})
