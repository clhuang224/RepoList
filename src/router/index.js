import Vue from "vue";
import VueRouter from "vue-router";
import Repository from "../views/Repository.vue";

Vue.use(VueRouter);

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
