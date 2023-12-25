import auth from "./middleware/auth";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    baseURL:'/financial/law-ldb'
  },
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
    API_URL:'https://dehome.ldblao.la/financial/iadoc/v1/prod/doc',
    // API_URL:'http://10.0.10.49:9001/financial/iadoc/v1/prod/doc',
    public:{
      API_URL: 'https://dehome.ldblao.la/financial/iadoc/v1/prod/doc'
      // API_URL: 'http://10.0.10.49:9001/financial/iadoc/v1/prod/doc'
    }
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
      },
},
  imports: {
    dirs: ['./stores'],
},

})
