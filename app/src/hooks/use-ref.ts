import { ref, Ref } from "vue";
import { isFunction } from "lodash";

export type UseRefSetValue<T> = (value: Partial<T>) => T;

export type UseRefReturn<T> = [Ref<T>, (value: Partial<T>) => void];

/**
 * 类似于react的useState，可以得到读写两个值
 * @param value 当前值
 * @param setValue 设置值得回调函数，参数是当前值，返回值是新值
 * @returns [值，设置值]
 */
const hook = <T>(value: T, setValue?: UseRefSetValue<T>): UseRefReturn<T> => {
  const innerValue = ref(value) as Ref<T>;
  const innerSetValue = (val: Partial<T>) => {
    const result = !isFunction(setValue) ? val : setValue(val);
    innerValue.value = result as T;
  };
  return [innerValue, innerSetValue];
};

export default hook;
