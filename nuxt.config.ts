
export default defineNuxtConfig({
  app: {
    baseURL: '/law-ldb'
  },
  components: true,
  css: ["@/assets/fonts/style.css", "@mdi/font/css/materialdesignicons.css"],
  modules: [
    '@invictus.codes/nuxt-vuetify', 'nuxt-icon',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'], },],
  ],
  runtimeConfig: {
   // API_URL: 'https://dehome.ldblao.la/meeting_api/prod/api/v1',
     API_URL:'http://10.0.10.49:9001/meeting_api/prod/api/v1',
    public: {
      //API_URL: 'https://dehome.ldblao.la/meeting_api/prod/api/v1'
     API_URL: 'http://10.0.10.49:9001/meeting_api/prod/api/v1'
    }
  },

})
// LDBVIP01	30-NOV-23 01.50.35.573352000 PM	782	8
// LDBVIP02	30-NOV-23 01.50.35.573352000 PM	782	9
// LDBVIP03	30-NOV-23 01.50.35.573352000 PM	782	10
// LDBVIP04	30-NOV-23 01.50.35.573352000 PM	782
