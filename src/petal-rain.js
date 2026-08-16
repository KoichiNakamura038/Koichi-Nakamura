import * as THREE from 'three';

const PETAL_COUNT = 140;

function createPetalShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.22, 0.18, 0.28, 0.48, 0, 1);
  shape.bezierCurveTo(-0.28, 0.48, -0.22, 0.18, 0, 0);
  const geometry = new THREE.ShapeGeometry(shape, 10);
  geometry.center();
  return geometry;
}

export function createPetalRain(container, { reducedMotion = false } = {}) {
  if (!container) return { setScrollProgress() {}, dispose() {} };

  const motionScale = reducedMotion ? 0.35 : 1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
  camera.position.set(0, 0, 14);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const geometry = createPetalShape();
  const group = new THREE.Group();
  scene.add(group);

  const petals = [];
  const palette = [0xff6b8a, 0xff8fab, 0xffb3c7, 0xffccd8, 0xffe0ea];

  for (let i = 0; i < PETAL_COUNT; i += 1) {
    const material = new THREE.MeshBasicMaterial({
      color: palette[i % palette.length],
      transparent: true,
      opacity: 0.55 + Math.random() * 0.4,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    const scale = 0.28 + Math.random() * 0.34;

    const data = {
      mesh,
      x: (Math.random() - 0.5) * 22,
      y: Math.random() * 16 - 4,
      z: (Math.random() - 0.5) * 10,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
      speed: (0.7 + Math.random() * 1.4) * motionScale,
      sway: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 3.2 * motionScale,
      tumble: (Math.random() - 0.5) * 2.4 * motionScale,
      scale,
      baseOpacity: material.opacity,
    };

    mesh.scale.setScalar(scale);
    mesh.position.set(data.x, data.y, data.z);
    mesh.rotation.set(data.rx, data.ry, data.rz);
    group.add(mesh);
    petals.push(data);
  }

  let scrollProgress = 0;
  let mouseX = 0;
  let mouseY = 0;
  let smoothMouseX = 0;
  let smoothMouseY = 0;
  let animationId = null;
  let width = 1;
  let height = 1;
  const clock = new THREE.Clock();

  function resize() {
    width = container.clientWidth || window.innerWidth;
    height = container.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function onMouseMove(event) {
    mouseX = (event.clientX / width - 0.5) * 2;
    mouseY = (event.clientY / height - 0.5) * 2;
  }

  function updatePetals(time, delta) {
    smoothMouseX += (mouseX - smoothMouseX) * 0.08;
    smoothMouseY += (mouseY - smoothMouseY) * 0.08;

    const intensity = (1 + scrollProgress * 0.8) * motionScale;
    const mouseWorldX = smoothMouseX * 9;
    const mouseWorldY = -smoothMouseY * 5;

    petals.forEach((petal) => {
      petal.y -= petal.speed * delta * intensity;
      petal.sway += delta * 1.4;

      petal.x += Math.sin(time * 1.1 + petal.sway) * delta * 2.2;
      petal.z += Math.cos(time * 0.75 + petal.sway) * delta * 1.1;

      const dx = petal.x - mouseWorldX;
      const dy = petal.y - mouseWorldY;
      const dz = petal.z;
      const dist = Math.hypot(dx, dy, dz * 0.35);

      if (dist < 5.5) {
        const force = ((5.5 - dist) / 5.5) * delta * 14 * motionScale;
        petal.x += dx * force * 0.55;
        petal.y += dy * force * 0.35;
        petal.z += dz * force * 0.25 + force * 0.8;
        petal.rz += delta * 6 * motionScale;
        petal.mesh.material.opacity = Math.min(1, petal.baseOpacity + 0.35);
      } else {
        petal.mesh.material.opacity += (petal.baseOpacity - petal.mesh.material.opacity) * 0.06;
      }

      if (petal.y < -9) {
        petal.y = 9 + Math.random() * 3;
        petal.x = (Math.random() - 0.5) * 22;
        petal.z = (Math.random() - 0.5) * 10;
      }

      petal.rx += petal.spin * delta;
      petal.ry += petal.tumble * delta;
      petal.rz += petal.spin * delta * 0.7;

      petal.mesh.position.set(petal.x, petal.y, petal.z);
      petal.mesh.rotation.set(petal.rx, petal.ry, petal.rz);
      petal.mesh.scale.setScalar(petal.scale * (1 + scrollProgress * 0.06));
    });

    group.rotation.z = smoothMouseX * 0.12;
    group.rotation.x = smoothMouseY * 0.06;
    group.position.x = smoothMouseX * 0.8;
    group.position.y = smoothMouseY * 0.35;

    camera.position.x = smoothMouseX * 0.6;
    camera.position.y = smoothMouseY * 0.35;
    camera.lookAt(smoothMouseX * 0.4, smoothMouseY * 0.2, 0);
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();
    const delta = Math.min(clock.getDelta(), 0.033);

    updatePetals(elapsed, delta);
    renderer.render(scene, camera);
  }

  resize();
  requestAnimationFrame(() => {
    resize();
    animate();
  });

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  return {
    setScrollProgress(value) {
      scrollProgress = value;
    },
    dispose() {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      geometry.dispose();
      petals.forEach((p) => p.mesh.material.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    },
  };
}
