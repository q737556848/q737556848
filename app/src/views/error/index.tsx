import { defineComponent } from "vue";

const View = defineComponent({
  name: "Error",

  props: {
    errorNum: {
      type: Number,
      default: 404
    }
  },

  setup(props) {
    return () => <div class="error-container">{props.errorNum}</div>;
  }
});

export default View;
