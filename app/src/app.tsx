import styles from "./app.module.scss";
import { defineComponent } from "vue";

const App = defineComponent({
  name: "App",

  setup() {
    return () => (
      <div class={styles["app-container"]}>
        <router-view />
      </div>
    );
  }
});

export default App;
