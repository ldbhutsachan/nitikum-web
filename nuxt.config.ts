export default defineNuxtConfig({
  compatibilityDate: '2026-06-08',

  app: {
    baseURL: '/law-ldb'
  },
  
  ssr: false,

  // 1. ເພີ່ມບລັອກກຳນົດຄ່າເລັ່ງດ່ວນນີ້ເຂົ້າໄປເພື່ອແກ້ໄຂ Bug ຂອງ Nuxt
  experimental: {
    viteEnvironmentApi: true
  },

  components: true,
  css: ["@/assets/fonts/style.css", "@mdi/font/css/materialdesignicons.css"],
  plugins: ['@/plugins/vuetify.ts'],
  
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'], },],
    "@nuxt/icon"
  ],
  
  runtimeConfig: {
    API_URL: 'https://dehome.ldblao.la/meet-law/prod/api/v1',
    // API_URL: 'http://10.0.10.49:9001/meet-law/prod/api/v1',
    public: {
      API_URL: 'https://dehome.ldblao.la/meet-law/prod/api/v1',
      DOC_URL: 'https://dehome.ldblao.la/mobile/QR/IMGMOBILE/iadoc/uploads'
      // API_URL: 'http://10.0.10.49:9001/meet-law/prod/api/v1',
      // DOC_URL: 'http://10.0.10.49:9001/mobile/QR/IMGMOBILE/iadoc/uploads'
    }
  },
  build: {
    transpile: ['vuetify']
  }, 
})
