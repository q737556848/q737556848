import { defaultEnvConfig, EnvConfig } from "./utils";

// 这个能直接加载所有配置文件，而非异步+懒加载
const envConfigModules = import.meta.glob("./*.ts", { eager: true });

let resultEnvConfig = defaultEnvConfig;
const mode = import.meta.env.MODE;
// @ts-ignore
const envConfig = envConfigModules[`./${mode}.ts`].default as EnvConfig;

if (!envConfig) {
  console.error(`无法找到对应的配置文件，是否正确设置了.${mode}.env相关配置文件,现在加载默认配置文件`); // throw可以中断整个模块文件的继续执行
} else {
  resultEnvConfig = envConfig;
}

export default resultEnvConfig;
