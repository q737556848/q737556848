import styles from "./three.module.scss";
import useModel from "./hooks/use-model";
import { createProvider } from "./hooks/use-store";
import { defineComponent, onMounted } from "vue";

const Component = defineComponent({
  name: "Three",

  setup(props, ctx) {
    const store = createProvider(props, ctx);
    const { isLoading, containerRef } = store;
    useModel(props, ctx, store);

    const init = () => {};

    onMounted(init);

    return () => (
      <div v-loading={isLoading.value} class={styles["three-container"]} ref={containerRef}>
        THREE
      </div>
    );
  }
});

export default Component;
