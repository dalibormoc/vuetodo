import Vue from "vue";
import App from "./App.vue";

import store from "./store/todos";

import "./styles/quasar.styl";
import "./node_modules/quasar-framework/dist/quasar.ie.polyfills";
import "./node_modules/quasar-extras/animate";
import "quasar-extras/material-icons";
import Quasar from "./node_modules/quasar";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);

Vue.use(Quasar, {
  config: {}
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
