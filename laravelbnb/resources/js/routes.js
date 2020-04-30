import ExampleComponent from "./components/ExampleComponent";
import VueRouter from "vue-router";

const routes = [
    {
        path: "/",
        component: ExampleComponent,
        name: "home",
    },
];

const router = new VueRouter({
    routes, //Short for 'routes: routes'
})

export default router;
