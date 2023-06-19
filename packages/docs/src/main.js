import Vue from "vue";
import App from "./App.vue";
import vuetify from "configuration/vuetify";
import http from "configuration/http";
import Bus from "plugins/bus";
import router from "router";
import pinia from "store";
import "components";
import "form/controls";
import "styles/index.css";

Vue.use(Bus);
Vue.use(http);

new Vue({
  pinia,
  render: (h) => h(App),
  vuetify,
  router,
}).$mount("#app");
