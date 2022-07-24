import App from "./app";
import Router from "./router";
import { createApp } from "vue";

const app = createApp(App);

app.use(Router);

app.mount("#app");
