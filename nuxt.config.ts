// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  components: true,
  css: ["@/assets/fonts/style.css","@mdi/font/css/materialdesignicons.css"],
  modules: [
    '@invictus.codes/nuxt-vuetify','nuxt-icon',
    [
      '@pinia/nuxt',
      {
          autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
  ],
  ],
  runtimeConfig: {
		API_URL: process.env.baseURL,
    API_KEY: 'ldb-key-x',
    public:{}
	},
  routeRules: {
    '/api/**': {
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Expose-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
        },
        //},
        // middleware: ['auth'],
    },
},
  imports: {
    dirs: ['./stores'],
},
})
