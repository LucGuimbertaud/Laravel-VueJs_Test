import VueRouter from "vue-router";
import Example2 from "./components/Example2";
import Bookable from "./bookables/Bookables"


const routes = [
    {
        path: "/",
        component: Bookable,
        name: "home",
    },
    {
        path: "/second",
        component: Example2,
        name: "second",
    },
];

const router = new VueRouter({
    routes, //Short for 'routes: routes'
    mode: "history",
})

export default router;
