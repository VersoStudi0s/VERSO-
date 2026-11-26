// Cena 3D do objeto cromado. Imports nomeados para o bundle levar só o que é usado.
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PMREMGenerator,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  SRGBColorSpace,
  Scene,
  TorusKnotGeometry,
  WebGLRenderer,
} from "three";
import type { HeroPointer } from "./heroPointer";

const TAU = Math.PI * 2;
const MAX_TILT = (15 * Math.PI) / 180;
const LERP = 0.08;
const IDLE_SPEED = TAU / 20; // uma volta a cada 20 s

/** Ruído suave e barato (soma de senos) para deformar o laço sem dependências extras. */
const organicNoise = (x: number, y: number, z: number) =>
  Math.sin(x * 1.7 + Math.sin(y * 2.3)) * 0.5 +
  Math.sin(y * 2.1 + Math.sin(z * 1.9)) * 0.3 +
  Math.sin(z * 2.6 + Math.sin(x * 1.3)) * 0.2;

/**
 * Monta a cena dentro de `container` e devolve a função que libera tudo.
 * Devolve undefined se o WebGL falhar (a imagem estática continua visível).
 */
export const createChromeScene = (
  container: HTMLElement,
  pointer: HeroPointer,
  onReady: () => void,
): (() => void) | undefined => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch {
    return undefined; // WebGL indisponível na prática: a imagem estática continua.
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  canvas.className = "object3d__canvas";
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0, 8.4);

  // Ambiente escuro com faixas vermelhas: é dele que vêm os reflexos.
  const pmrem = new PMREMGenerator(renderer);
  const envScene = new Scene();
  envScene.background = new Color(0x050505);
  const stripGeometry = new PlaneGeometry(1, 1);
  const red = new MeshBasicMaterial({ color: new Color("#FF2E1F").multiplyScalar(4), side: DoubleSide });
  const warm = new MeshBasicMaterial({ color: new Color("#F2EEE6").multiplyScalar(2.4), side: DoubleSide });
  const strips: [MeshBasicMaterial, [number, number, number], [number, number]][] = [
    [red, [-5, 1, 0], [1.4, 9]],
    [red, [5, -1, 1], [1.8, 8]],
    [red, [0, 5, -2], [10, 0.9]],
    [red, [-2, -4, 3], [6, 0.6]],
    [warm, [2.5, 3, 4], [4, 0.5]],
    [warm, [-3.5, 2.5, 3], [0.4, 3.5]],
    [warm, [0, 0, 6], [2.2, 0.25]],
  ];
  for (const [stripMaterial, position, size] of strips) {
    const strip = new Mesh(stripGeometry, stripMaterial);
    strip.position.set(...position);
    strip.scale.set(size[0], size[1], 1);
    strip.lookAt(0, 0, 0);
    envScene.add(strip);
  }
  const envTarget = pmrem.fromScene(envScene, 0.035);
  scene.environment = envTarget.texture;

  // Laço orgânico: TorusKnot (2,3) deformado ao longo das normais.
  const geometry = new TorusKnotGeometry(1, 0.3, 320, 48, 2, 3);
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  if (position && normal) {
    for (let index = 0; index < position.count; index += 1) {
      const x = position.getX(index);
      const y = position.getY(index);
      const z = position.getZ(index);
      const offset = organicNoise(x, y, z) * 0.12;
      position.setXYZ(
        index,
        x + normal.getX(index) * offset,
        y + normal.getY(index) * offset,
        z + normal.getZ(index) * offset,
      );
    }
    geometry.computeVertexNormals();
  }

  const material = new MeshPhysicalMaterial({
    color: 0x2a2424,
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    transmission: 0.12,
    thickness: 0.6,
    ior: 1.5,
    envMapIntensity: 2.2,
  });

  const mesh = new Mesh(geometry, material);
  mesh.rotation.set(0.35, 0, 0.2);
  const pivot = new Group(); // recebe inclinação do mouse e flutuação
  pivot.add(mesh);
  scene.add(pivot);

  const keyLeft = new PointLight("#FF2E1F", 40, 20, 2);
  keyLeft.position.set(-3.5, 1, 2.5);
  const keyRight = new PointLight("#FF2E1F", 30, 20, 2);
  keyRight.position.set(3.5, -0.8, 2);
  scene.add(keyLeft, keyRight, new AmbientLight(0xffffff, 0.08));

  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (!running) renderer.render(scene, camera);
  };

  // Arrastar gira o objeto (com inércia); toque mantém a rolagem vertical.
  let dragging = false;
  let lastX = 0;
  let spinVelocity = 0;
  const onPointerDown = (event: PointerEvent) => {
    dragging = true;
    lastX = event.clientX;
    canvas.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent) => {
    if (!dragging) return;
    const delta = event.clientX - lastX;
    lastX = event.clientX;
    mesh.rotation.y += delta * 0.01;
    spinVelocity = delta * 0.01;
    if (!running) renderer.render(scene, camera);
  };
  const onPointerUp = (event: PointerEvent) => {
    dragging = false;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  };
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);

  // Laço de animação: pausado fora da tela e com a aba escondida.
  let running = false;
  let frame = 0;
  let last = performance.now();
  let elapsed = 0;
  let tiltX = 0;
  let tiltY = 0;
  let scale = 1;

  // Qualidade adaptativa: se a média ficar abaixo de ~45 fps, reduz o pixel ratio; depois
  // desliga a transmissão (a passada mais cara); se nem assim passar de ~30 fps, congela
  // o objeto no último quadro para não travar a página.
  let sampleTime = 0;
  let sampleFrames = 0;
  let quality = 3;
  let frozen = false;
  const adaptQuality = (dt: number) => {
    if (quality === 0) return;
    sampleTime += dt;
    sampleFrames += 1;
    if (sampleFrames < 90) return;
    const average = sampleTime / sampleFrames;
    sampleTime = 0;
    sampleFrames = 0;
    if (average <= (quality === 1 ? 1 / 30 : 1 / 45)) return;
    if (quality === 3) {
      renderer.setPixelRatio(1);
      resize();
    } else if (quality === 2) {
      material.transmission = 0;
      material.needsUpdate = true;
    } else {
      frozen = true;
      pause();
    }
    quality -= 1;
  };

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    const raw = (now - last) / 1000;
    const dt = Math.min(raw, 0.05);
    last = now;
    if (raw < 0.25) adaptQuality(raw);
    elapsed += dt;

    const { x, y, active } = pointer;
    tiltY += ((active ? x : 0) * MAX_TILT - tiltY) * LERP;
    tiltX += ((active ? -y : 0) * MAX_TILT - tiltX) * LERP;
    scale += ((active ? 1.06 : 1) - scale) * LERP;

    if (!dragging) {
      spinVelocity *= 0.94;
      mesh.rotation.y += IDLE_SPEED * dt + spinVelocity;
    }
    pivot.rotation.set(tiltX, tiltY, 0);
    pivot.position.y = Math.sin(elapsed * 1.1) * 0.08;
    pivot.scale.setScalar(scale);
    renderer.render(scene, camera);
  };

  const play = () => {
    if (running || reduceMotion || frozen) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };
  const pause = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  let onScreen = true;
  const observer = new IntersectionObserver(([entry]) => {
    onScreen = entry?.isIntersecting ?? false;
    if (onScreen && !document.hidden) play();
    else pause();
  });
  observer.observe(container);
  const onVisibility = () => (document.hidden || !onScreen ? pause() : play());
  document.addEventListener("visibilitychange", onVisibility);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  resize();
  renderer.render(scene, camera); // primeiro quadro: troca a imagem pelo canvas
  onReady();
  play();

  return () => {
    pause();
    observer.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointercancel", onPointerUp);
    geometry.dispose();
    material.dispose();
    stripGeometry.dispose();
    red.dispose();
    warm.dispose();
    envTarget.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };
};
