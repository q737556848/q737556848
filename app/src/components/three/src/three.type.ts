import Three from "./three";
import { useStore } from "./hooks/use-store";
import type { ExtractPropTypes, PropType, SetupContext } from "vue";
import { ModelsUrlName, modelsUrlMap } from "@app/src/const/models-url-map";

export const threeProps = {
  // 模型文件名
  modelName: {
    type: String as PropType<ModelsUrlName>,
    default: Object.keys(modelsUrlMap)[0]
  }
};
export const threeEmits = {};

export type ThreeStore = ReturnType<typeof useStore>;
export type ThreeProps = Readonly<ExtractPropTypes<typeof threeProps>>;
export type ThreeEmits = Readonly<typeof threeEmits>;
export type ThreeContext = SetupContext<ThreeEmits>;
export type ThreeInstance = InstanceType<typeof Three>;
