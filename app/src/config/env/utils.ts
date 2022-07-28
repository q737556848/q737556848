export type EnvConfig = {
  isLocalModel: boolean;
};

export const defaultEnvConfig: Required<EnvConfig> = {
  isLocalModel: false
};

export const createEnvConfig = (envConfig: EnvConfig) => {
  return {
    ...defaultEnvConfig,
    ...envConfig
  };
};
