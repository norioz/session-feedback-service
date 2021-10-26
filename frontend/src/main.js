import Vue from "vue";
import FeedbackApp from "./apps/Feedback.vue";
import OpsApp from "./apps/Ops.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";

const NotFound = { template: "<p>Page not found</p>" };

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

const routes = {
  "/": FeedbackApp,
  "/ops": OpsApp,
};

new Vue({
  vuetify,
  el: "#app",
  data: {
    currentRoute: window.location.pathname,
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || NotFound;
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});

// new Vue({
//   vuetify,
//   render: (h) => h(App),
// }).$mount("#app");
