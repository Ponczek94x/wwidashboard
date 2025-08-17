import * as THREE from 'three';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.setClearColor(0x000000);
//renderer.setClearColor(0xffffff); // Set background color to white
renderer.shadowMap.enabled = true; // Enable shadows
document.body.appendChild(renderer.domElement);

const fov = 40;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 0);
camera.lookAt(0, 0, 0);
let angle = 0;

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 4, 1);
light.castShadow = true; // Enable shadow casting for the light
scene.add(light);


const starGeometry = new THREE.BufferGeometry();
const starCount = 10000;
const starVertices = [];

for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));

// Star material
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const stars = new THREE.Points(starGeometry, starMaterial);

scene.add(stars);

function animate() {
    // Smooth camera movement
    const lookX = Math.cos(angle);
    const lookZ = Math.sin(angle);
    camera.lookAt(lookX, 0, lookZ);
    renderer.render(scene, camera);
    //cube.rotation.y += 0.01;
    angle += 0.003; // Increment angle for smooth rotation
}
renderer.setAnimationLoop(animate);
