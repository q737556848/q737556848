import { defineComponent } from "vue";

const Component = defineComponent({
  name: "Three",

  setup() {
    return () => <div class="three-container">Three</div>;
  }
});

export default Component;
