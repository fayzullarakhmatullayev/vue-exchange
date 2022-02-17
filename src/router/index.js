import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "ListСurrencies",
    component: () => import("../views/ListСurrencies.vue"),
  },
  {
    path: "/converter",
    name: "Converter",
    component: () => import("../views/Converter.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
