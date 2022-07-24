import Index from "@app/src/views/index";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/index" },
  { path: "/index", component: Index, name: `${Index.name}View` }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
