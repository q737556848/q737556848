import dev from "./dev";
import prod from "./prod";
import { defaultEnvConfig, EnvConfig } from "./utils";

const envConfigMap = {
  dev,
  prod
};

let resultEnvConfig = defaultEnvConfig;
const mode = import.meta.env.MODE;
const envConfig = envConfigMap[mode] as EnvConfig;

if (!envConfig) {
  console.error(`无法找到对应的配置文件，是否正确设置了.${mode}.env相关配置文件,现在加载默认配置文件`); // throw可以中断整个模块文件的继续执行
} else {
  resultEnvConfig = envConfig;
}

export default resultEnvConfig;
