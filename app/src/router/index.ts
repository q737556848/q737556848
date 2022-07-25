import Index from "@app/src/views/index";
import Error from "@app/src/views/error";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { defineComponent, h } from "vue";

const getErrorView = (errorNum: number) =>
  defineComponent({
    render: () =>
      h(Error, {
        errorNum: errorNum
      })
  });

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/index" },
  { path: "/index", component: Index, name: `${Index.name}View` },
  { path: "/404", component: getErrorView(404), name: `${Error.name}404View` },
  { path: "/503", component: getErrorView(503), name: `${Error.name}503View` },
  { path: "/:catchAll(.*)", redirect: "/404" }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
