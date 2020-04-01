import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from 'vue-meta'
import Repository from "../views/Repository.vue";

Vue.use(VueRouter);
Vue.use(VueMeta)

const routes = [
    {
        path: "/",
        name: "Repository",
        component: Repository
    }
];

const router = new VueRouter({
    routes
});

export default router;
