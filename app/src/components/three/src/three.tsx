import * as THREE from "three";
import styles from "./three.module.scss";
import useModel from "./hooks/use-model";
import { createProvider } from "./hooks/use-store";
import { threeProps, threeEmits } from "./three.type";
import { defineComponent, onMounted } from "vue";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const Component = defineComponent({
  name: "Three",

  props: threeProps,
  emits: threeEmits,

  setup(props, ctx) {
    const store = createProvider(props, ctx);
    const { isLoading, containerRef } = store;
    const { modelUrl } = useModel(props, ctx, store);

    const init = () => {
      const scene = new THREE.Scene();
      const gltfLoader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("draco/");
      gltfLoader.setDRACOLoader(dracoLoader);

      gltfLoader.load(modelUrl.value, gltf => {
        console.log(gltf, "gltf");
        scene.add(gltf.scene);
      });

      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
      camera.position.set(0, 0, 100);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.outputEncoding = THREE.sRGBEncoding; //!不加颜色变暗

      renderer.setClearColor("#ffffff");
      renderer.render(scene, camera);

      containerRef.value?.appendChild(renderer.domElement);
    };

    onMounted(init);

    return () => <div v-loading={isLoading.value} class={styles["three-container"]} ref={containerRef}></div>;
  }
});

export default Component;
