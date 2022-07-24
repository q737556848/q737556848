import { defineComponent } from "vue";

const App = defineComponent({
  name: "App",

  setup() {
    return () => (
      <div class="app-container">
        <router-view />
      </div>
    );
  }
});

export default App;
