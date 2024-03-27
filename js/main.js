import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const myDiv = document.getElementById("extrabody");
let height = myDiv.clientHeight;
let width = myDiv.clientWidth;
let divider = 3;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    width / -divider,
    width / divider,
    height / divider,
    height / -divider,
    0.01,
    3
);

const loader = new GLTFLoader();
const objToRender = 'knightme';
let object, mixer;
loader.load(
    `./models/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        scene.add(object);

       

        const cameraHeight = 1; // meters
        const cameraDistance = 2; // meters
        object.rotation.set(0, -0.4, 0);
        

        const boundingBox = new THREE.Box3().setFromObject(object);
        const center = boundingBox.getCenter(new THREE.Vector3());
        camera.position.set(center.x, center.y + cameraHeight, center.z + cameraDistance);
        
        camera.lookAt(center);

        if (gltf.animations && gltf.animations.length) {
            mixer = new THREE.AnimationMixer(object);
            gltf.animations.forEach((clip) => {
                mixer.clipAction(clip).play();
            });
        }

        updateRendererSize();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
document.getElementById("container3D").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = true;
controls.enableZoom = false;
controls.enableDamping = true;
controls.minPolarAngle = controls.maxPolarAngle = Math.PI / 2; // Lock vertical rotation
controls.minAzimuthAngle = 0.4



const light2 = new THREE.PointLight(0xffffff, 2, 200);
light2.position.set(10, 40, 50);
scene.add(light2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2, 100);
directionalLight.position.set(-100, 2, 30);
scene.add(directionalLight);

function updateRendererSize() {
    height = myDiv.clientHeight;
    width = myDiv.clientWidth;
    camera.left = width / -divider;
    camera.right = width / divider;
    camera.top = height / divider;
    camera.bottom = height / -divider;
    camera.aspect = width / height;
    camera.zoom = Math.min((width / 1080), (height / 1820)) * 550;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

window.addEventListener('resize', () => {
  updateRendererSize();
  camera.updateProjectionMatrix();
});


function animate() {
    requestAnimationFrame(animate);
    if (mixer) {
        mixer.update(0.01);
    }
    controls.update();
    renderer.render(scene, camera);
}

animate();
