import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as labsComponents from "vuetify/labs/components";
import * as directives from "vuetify/directives";
import { VDataTable } from "vuetify/labs/VDataTable";
import { VuetifyDateAdapter } from "vuetify/labs/date/adapters/vuetify";
import "vuetify/dist/vuetify.min.css";

export default defineNuxtPlugin((nuxtApp) => {
  console.log("this is vuetify");
  const vuetify = createVuetify({
    ssr: false,
    components: {
      ...components,
      ...labsComponents,
      VDataTable,
    },
    date: {
      adapter: VuetifyDateAdapter,
    },
    directives,
  });
  nuxtApp.vueApp.use(vuetify);
});