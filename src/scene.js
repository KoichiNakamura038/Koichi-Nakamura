import * as THREE from 'three';

const SAKURA_COUNT = 700;
const TORUS_COUNT = 36;

export function createScene(container, { reducedMotion = false } = {}) {
  const motionScale = reducedMotion ? 0.35 : 1;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0c10, 0.018);

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.5, 6.5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xfff5f0, 0.45));

  const keyLight = new THREE.PointLight(0xff8a65, 1.4, 20);
  keyLight.position.set(3, 2, 4);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x7eb8ff, 0.7, 18);
  fillLight.position.set(-4, -1, 2);
  scene.add(fillLight);

  const sakura = createSakuraField();
  scene.add(sakura.points);

  const ribbons = createLightRibbons();
  scene.add(ribbons);

  const rings = createFloatingRings();
  scene.add(rings);

  const core = createLuminousCore();
  scene.add(core);

  let scrollProgress = 0;
  let mouseX = 0;
  let mouseY = 0;
  let animationId = null;
  const clock = new THREE.Clock();

  function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sakura.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();
    const t = elapsed * motionScale;

    sakura.material.uniforms.uTime.value = t;
    sakura.material.uniforms.uMouse.value.set(mouseX, mouseY);
    sakura.points.rotation.y = t * 0.014 + scrollProgress * 0.45;
    sakura.points.rotation.x = Math.sin(t * 0.1) * 0.06;
    sakura.points.position.y = -scrollProgress * 1.1;

    ribbons.rotation.z = t * 0.035 + scrollProgress * 0.15;
    ribbons.rotation.y = t * 0.05;

    rings.rotation.x = t * 0.07;
    rings.rotation.y = t * 0.1 + scrollProgress * 0.35;

    core.rotation.y = t * 0.12;
    core.rotation.z = Math.sin(t * 0.18) * 0.1;
    core.position.y = 0.2 - scrollProgress * 1.2;

    camera.position.x += (mouseX * 0.35 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 0.18 + 0.35 - scrollProgress * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(mouseX * 0.2, -0.3 - scrollProgress * 0.8, 0);

    renderer.render(scene, camera);
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('resize', onResize);

  animate();

  return {
    setScrollProgress(value) {
      scrollProgress = value;
    },
    dispose() {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      sakura.geometry.dispose();
      sakura.material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    },
  };
}

function createSakuraField() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(SAKURA_COUNT * 3);
  const scales = new Float32Array(SAKURA_COUNT);
  const colors = new Float32Array(SAKURA_COUNT * 3);

  const colorA = new THREE.Color(0xffb7c5);
  const colorB = new THREE.Color(0xffe4ec);
  const colorC = new THREE.Color(0xf8f0e8);

  for (let i = 0; i < SAKURA_COUNT; i += 1) {
    const i3 = i * 3;
    const radius = 2.5 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

    scales[i] = Math.random() * 0.65 + 0.2;

    const mix = Math.random();
    const tint = mix < 0.33 ? colorA : mix < 0.66 ? colorB : colorC;
    colors[i3] = tint.r;
    colors[i3 + 1] = tint.g;
    colors[i3 + 2] = tint.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uMouse: { value: new THREE.Vector2() },
    },
    vertexShader: `
      attribute float aScale;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float uTime;
      uniform float uPixelRatio;
      uniform vec2 uMouse;

      void main() {
        vColor = color;
        vec3 pos = position;
        pos.y += sin(uTime * 0.35 + position.x * 0.45) * 0.18;
        pos.x += cos(uTime * 0.28 + position.z) * 0.1 + uMouse.x * 0.15;
        pos.z += uMouse.y * 0.1;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aScale * uPixelRatio * (240.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float dist = length(uv);
        if (dist > 0.5) discard;
        float alpha = smoothstep(0.5, 0.06, dist);
        gl_FragColor = vec4(vColor, alpha * 0.8);
      }
    `,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;

  return { points, geometry, material };
}

function createLightRibbons() {
  const group = new THREE.Group();
  const curvePoints = [];

  for (let i = 0; i <= 40; i += 1) {
    const t = i / 40;
    curvePoints.push(
      new THREE.Vector3(
        Math.sin(t * Math.PI * 4) * 2.2,
        (t - 0.5) * 5,
        Math.cos(t * Math.PI * 3) * 1.5 - 1
      )
    );
  }

  const curve = new THREE.CatmullRomCurve3(curvePoints);
  const geometry = new THREE.TubeGeometry(curve, 120, 0.004, 6, false);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffb7a1,
    transparent: true,
    opacity: 0.2,
  });

  group.add(new THREE.Mesh(geometry, material));
  return group;
}

function createFloatingRings() {
  const group = new THREE.Group();

  for (let i = 0; i < TORUS_COUNT; i += 1) {
    const geometry = new THREE.TorusGeometry(0.015 + Math.random() * 0.02, 0.002, 8, 24);
    const material = new THREE.MeshBasicMaterial({
      color: i % 3 === 0 ? 0xffb7a1 : i % 3 === 1 ? 0xa8c7ff : 0xf5f0ea,
      transparent: true,
      opacity: 0.35 + Math.random() * 0.35,
    });

    const mesh = new THREE.Mesh(geometry, material);
    const angle = (i / TORUS_COUNT) * Math.PI * 2;
    const radius = 1.8 + (i % 5) * 0.35;

    mesh.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 3,
      Math.sin(angle) * radius
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    group.add(mesh);
  }

  return group;
}

function createLuminousCore() {
  const geometry = new THREE.IcosahedronGeometry(0.55, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffb7a1,
    transparent: true,
    opacity: 0.35,
    wireframe: true,
  });

  return new THREE.Mesh(geometry, material);
}
