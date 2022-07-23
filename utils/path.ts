import path from "path";

export const createPathFromRoot = (suffixPath: string) => {
  return (...subPathList: string[]) => path.resolve(__dirname, "../", suffixPath, ...subPathList);
};

export const getRootPath = createPathFromRoot("./");
export const getAppPath = createPathFromRoot("./app");
export const getModelsPath = createPathFromRoot("./models");
export const getServerPath = createPathFromRoot("./server");
