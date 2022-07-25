import styles from "./index.module.scss";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

const View = defineComponent({
  name: "Error",

  props: {
    errorNum: {
      type: Number,
      default: 404
    }
  },

  setup(props) {
    const router = useRouter();

    const returnIndex = () => {
      router.push("/");
    };

    return () => (
      <div class={styles["error-container"]}>
        <span class={styles["text"]}>{props.errorNum}</span>
        <span class={styles["button"]}>
          <el-button size="large" onClick={returnIndex}>
            返回首页
          </el-button>
        </span>
      </div>
    );
  }
});

export default View;
