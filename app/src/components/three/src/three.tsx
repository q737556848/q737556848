import * as THREE from "three";
import styles from "./three.module.scss";
import useModel from "./hooks/use-model";
import { createProvider } from "./hooks/use-store";
import { threeProps, threeEmits } from "./three.type";
import { defineComponent, onMounted } from "vue";
import Stats from "three/examples/jsm/libs/stats.module";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";

const Component = defineComponent({
  name: "Three",

  props: threeProps,
  emits: threeEmits,

  setup(props, ctx) {
    const store = createProvider(props, ctx);
    const { isLoading, containerRef } = store;

    const init = () => {
      // @ts-ignore
      let mixer;

      const clock = new THREE.Clock();

      // @ts-ignore
      const stats = new Stats() as Stats;
      containerRef.value?.appendChild(stats.dom);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      containerRef.value?.appendChild(renderer.domElement);

      const pmremGenerator = new THREE.PMREMGenerator(renderer);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xbfe3dd);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

      const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
      camera.position.set(5, 2, 8);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0.5, 0);
      controls.update();
      controls.enablePan = false;
      controls.enableDamping = true;

      useModel("littleBee", {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.01, 0.01, 0.01),
        rotation: new THREE.Vector3(0, 65, 0),
        loadCallback(modelInstance, model) {
          scene.add(model);
          mixer = new THREE.AnimationMixer(model);
          mixer.clipAction(modelInstance.animations[0]).play();
          animate();
        }
      });

      window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();

        // @ts-ignore
        mixer.update(delta);

        controls.update();

        stats.update();

        renderer.render(scene, camera);
      }
    };

    onMounted(init);

    return () => <div v-loading={isLoading.value} class={styles["three-container"]} ref={containerRef}></div>;
  }
});

export default Component;
