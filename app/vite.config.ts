import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";
import { getModelsPath, getServerPath, getAppPath } from "../utils/path";

export default defineConfig({
  plugins: [vueJsx(), vue()],
  resolve: {
    alias: [
      { find: "@models", replacement: getModelsPath("./") },
      { find: "@app", replacement: getAppPath("./") },
      { find: "@server", replacement: getServerPath("./") }
    ]
  }
});
