import envConfig from "@app/src/config/env";
import { modelsUrlMap } from "@app/src/const/models-url-map";
import { computed } from "vue";
import { ThreeContext, ThreeProps, ThreeStore } from "../three.type";

const hook = (props: ThreeProps, ctx: ThreeContext, store: ThreeStore) => {
  const modelUrl = computed(() =>
    envConfig.isLocalModel ? location.origin + `/models/${props.modelName}.glb` : modelsUrlMap[props.modelName]
  );

  return {
    modelUrl
  };
};

export default hook;
