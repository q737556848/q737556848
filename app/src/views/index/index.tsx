import Three from "@app/src/components/three";
import { defineComponent } from "vue";

const View = defineComponent({
  name: "Index",

  setup() {
    return () => (
      <div class="index-container">
        <Three />
      </div>
    );
  }
});

export default View;
