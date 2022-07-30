import * as THREE from "three";
import envConfig from "@app/src/config/env";
import { modelsUrlMap, ModelsUrlName } from "@app/src/const/models-url-map";
import { computed, ref, toRaw } from "vue";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { isFunction } from "lodash";

// 类型与默认值
export type UseModelModelName = ModelsUrlName;
export type UseModelOptions = {
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  quaternion: THREE.Quaternion;
  scale: THREE.Vector3;
  loadCallback: (modelInstance: GLTF, model: THREE.Group) => void;
};
export type UseModelReturn = ReturnType<typeof hook>;
export type UseModel = typeof hook;
export const defaultUseModelOptions: UseModelOptions = {
  position: new THREE.Vector3(0, 0, 0),
  quaternion: new THREE.Quaternion(0, 0, 0, 1),
  scale: new THREE.Vector3(1, 1, 1),
  rotation: new THREE.Vector3(0, 0, 0),
  loadCallback: () => null
};

// 钩子函数
const hook = (modelName: UseModelModelName, options: Partial<UseModelOptions> = defaultUseModelOptions) => {
  // 合并options
  const combineOptions: UseModelOptions = {
    ...defaultUseModelOptions,
    ...options
  };
  // 模型url
  const modelUrl = computed(() =>
    envConfig.isLocalModel ? location.origin + `/models/${modelName}.glb` : modelsUrlMap[modelName]
  );
  // 模型引用
  let modelInstance = ref<GLTF | null>(null);
  let model = ref<THREE.Group | null>(null);
  // loader
  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("draco/");
  gltfLoader.setDRACOLoader(dracoLoader);
  gltfLoader.load(
    modelUrl.value,
    gltf => {
      modelInstance.value = gltf; // 包含转换后的动画等数据
      model.value = gltf.scene; // 实际这个是对应的Object3d对象，可以设置位置，比例等
      model.value.position.set(...combineOptions.position.toArray());
      model.value.scale.set(...combineOptions.scale.toArray());
      // 四元数的优先级高于欧拉角
      if (options.quaternion) {
        model.value.rotation.setFromQuaternion(combineOptions.quaternion);
      } else {
        model.value.rotation.setFromVector3(combineOptions.rotation);
      }
      model.value.rotation.setFromVector3(combineOptions.rotation);
      isFunction(combineOptions.loadCallback) && combineOptions.loadCallback(gltf, gltf.scene);
    },
    xhr => {
      console.log(`${modelName}加载进度：${(xhr.loaded / xhr.total) * 100}%`);
    },
    error => {
      console.error(`${modelName}加载失败，失败链接：${modelUrl.value}，失败原因：${error}`);
    }
  );

  return {
    modelUrl,
    modelInstance,
    model
  };
};

export default hook;
