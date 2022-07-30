import useRef from "@app/src/hooks/use-ref";
import { inject, provide, ref } from "vue";
import { ThreeProps, ThreeContext } from "../three.type";

export const KEY = "THREE"; // 一样没关系，反正他们用的组件不会互相污染

export const useStore = (props: ThreeProps, ctx: ThreeContext) => {
  const containerRef = ref<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useRef(false);

  console.log(ctx);

  return {
    isLoading,
    setIsLoading,
    containerRef
  };
};

export const createProvider = (props: ThreeProps, ctx: ThreeContext) => {
  const value = useStore(props, ctx);
  provide(KEY, value);
  return value;
};

export const createInjector = () => {
  return inject(KEY) as ReturnType<typeof useStore>;
};
