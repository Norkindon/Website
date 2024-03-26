"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("https://cdn.skypack.dev/three@0.129.0/build/three.module.js"));

var _OrbitControls = require("https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js");

var _GLTFLoader = require("https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var myDiv = document.getElementById("extrabody");
var height = myDiv.clientHeight;
var width = myDiv.clientWidth;
var divider = 3;
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(width / -divider, width / divider, height / divider, height / -divider, 0.01, 3);
var loader = new _GLTFLoader.GLTFLoader();
var objToRender = 'knightme';
var object, mixer;
loader.load("/models/".concat(objToRender, "/scene.gltf"), function (gltf) {
  object = gltf.scene;
  scene.add(object);
  var cameraHeight = 1; // meters

  var cameraDistance = 2; // meters

  object.rotation.set(0, -0.4, 0);
  var boundingBox = new THREE.Box3().setFromObject(object);
  var center = boundingBox.getCenter(new THREE.Vector3());
  camera.position.set(center.x, center.y + cameraHeight, center.z + cameraDistance);
  camera.lookAt(center);

  if (gltf.animations && gltf.animations.length) {
    mixer = new THREE.AnimationMixer(object);
    gltf.animations.forEach(function (clip) {
      mixer.clipAction(clip).play();
    });
  }

  updateRendererSize();
}, function (xhr) {
  console.log(xhr.loaded / xhr.total * 100 + '% loaded');
}, function (error) {
  console.error(error);
});
var renderer = new THREE.WebGLRenderer({
  alpha: true
});
renderer.setSize(width, height);
document.getElementById("container3D").appendChild(renderer.domElement);
var controls = new _OrbitControls.OrbitControls(camera, renderer.domElement);
controls.enablePan = true;
controls.enableZoom = false;
controls.enableDamping = true;
controls.minPolarAngle = controls.maxPolarAngle = Math.PI / 2; // Lock vertical rotation

controls.minAzimuthAngle = 0.4;
var light2 = new THREE.PointLight(0xffffff, 2, 200);
light2.position.set(10, 40, 50);
scene.add(light2);
var directionalLight = new THREE.DirectionalLight(0xffffff, 2, 100);
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
  camera.zoom = Math.min(width / 1080, height / 1820) * 550;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener('resize', function () {
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