import App from "./app";
import Router from "./router";
import ElementPlus from "element-plus";
import { createApp } from "vue";

import "element-plus/dist/index.css";
import "./assets/styles/index.scss";

import "@app/src/config/env";

const app = createApp(App);

app.use(Router);

app.use(ElementPlus);

app.mount("#app");

console.log(import.meta.env);
