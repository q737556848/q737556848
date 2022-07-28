import Three from "./three";
import { useStore } from "./hooks/use-store";
import type { ExtractPropTypes, SetupContext } from "vue";

export const threeProps = {};
export const threeEmits = {};

export type ThreeStore = ReturnType<typeof useStore>;
export type ThreeProps = Readonly<ExtractPropTypes<typeof threeProps>>;
export type ThreeEmits = Readonly<typeof threeEmits>;
export type ThreeContext = SetupContext<ThreeEmits>;
export type ThreeInstance = InstanceType<typeof Three>;
