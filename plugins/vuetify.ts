import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// Note: VCalendar and VTimePicker imports removed - these components may need to be imported differently in newer Vuetify versions

import 'vuetify/lib/styles/main.sass'
import '@mdi/font/css/materialdesignicons.min.css'
import "vuetify/dist/vuetify.min.css";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: false,
    components: {
      ...components,
      // VCalendar and VTimePicker removed - may need to be added back with correct imports
    },
    directives,
  });
  nuxtApp.vueApp.use(vuetify);
});