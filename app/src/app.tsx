import { defineComponent, ref } from "vue";
import { count } from "@models/count";

const App = defineComponent({
  name: "App",
  render() {
    return <div>count3: {count}</div>;
  }
});

export default App;
