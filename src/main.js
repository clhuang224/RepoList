import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMeta from "vue-meta";
import axios from "axios";
import VueAxios from "vue-axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
    faMapMarkerAlt,
    faRss,
    faEnvelope,
    faCode,
    faEye,
    faQuoteLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(VueMeta);
Vue.use(VueAxios, axios);

library.add(faGithub, faMapMarkerAlt, faRss, faEnvelope, faCode, faEye, faQuoteLeft);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
