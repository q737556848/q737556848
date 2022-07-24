import App from "./app";
import Router from "./router";
import { createApp } from "vue";

import "./assets/styles/index.scss";

const app = createApp(App);

app.use(Router);

app.mount("#app");
