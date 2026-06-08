import en from './assets/language/en.json';
import lo from './assets/language/lo.json';
export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    // fallbackLocale:'lo',
    messages: {
        en,
        lo
    }
}))