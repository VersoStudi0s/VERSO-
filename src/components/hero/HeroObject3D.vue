<script setup lang="ts">
// Objeto cromado 3D do hero. A cena (Three.js) é carregada sob demanda, depois que a
// página já pintou; até lá, e se não houver WebGL, a imagem estática fica visível.
import { onBeforeUnmount, onMounted, ref } from "vue";
import type { HeroPointer } from "./heroPointer";

const props = defineProps<{ pointer: HeroPointer }>();

const host = ref<HTMLDivElement>();
const ready = ref(false);

let cleanup: (() => void) | undefined;
let disposed = false;

/**
 * Só usa o 3D com WebGL acelerado por GPU. Com renderização por software (SwiftShader,
 * llvmpipe, Basic Render) cada quadro custa centenas de ms na CPU e travaria a página,
 * então a imagem estática continua. Também respeita o modo de economia de dados.
 */
const SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render/i;
const canUseHardware3D = () => {
  // ?forcar-3d pula a checagem de GPU (usado nos testes automatizados, que rodam sem GPU).
  if (new URLSearchParams(location.search).has("forcar-3d")) return true;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !SOFTWARE_RENDERER.test(renderer);
  } catch {
    return false;
  }
};

const whenIdle = (callback: () => void) => {
  // Safari não tem requestIdleCallback: usa um atraso curto.
  const start = () => {
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(callback, { timeout: 2500 });
    else setTimeout(callback, 600);
  };
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
};

const start = async () => {
  const container = host.value;
  if (!container || disposed || !canUseHardware3D()) return;
  try {
    const { createChromeScene } = await import("./createChromeScene");
    if (disposed) return;
    cleanup = createChromeScene(container, props.pointer, () => (ready.value = true));
  } catch {
    // Falha ao carregar ou iniciar a cena: mantém a imagem estática.
  }
};

onMounted(() => whenIdle(() => void start()));
onBeforeUnmount(() => {
  disposed = true;
  cleanup?.();
});
</script>

<template>
  <div class="object3d" :class="{ 'is-ready': ready }" data-cursor="ARRASTE">
    <img
      class="object3d__fallback"
      src="/images/escultura-cromada-480.webp"
      srcset="/images/escultura-cromada-400.webp 400w, /images/escultura-cromada-480.webp 480w, /images/escultura-cromada-960.webp 960w"
      sizes="(min-width: 960px) 30vw, min(300px, 72vw)"
      width="960"
      height="960"
      alt=""
      decoding="async"
    />
    <div ref="host" class="object3d__stage" aria-hidden="true"></div>
  </div>
</template>

<style scoped>
.object3d {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}
.object3d__fallback,
.object3d__stage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.object3d__fallback {
  filter: drop-shadow(0 2px 2px oklch(0% 0 0 / 0.4)) drop-shadow(0 18px 24px oklch(0% 0 0 / 0.5));
  transition: opacity 500ms var(--ease);
}
/* O canvas ocupa uma área maior que a imagem para a inclinação e o zoom não cortarem o objeto. */
.object3d__stage {
  inset: -14%;
  width: 128%;
  height: 128%;
  opacity: 0;
  transition: opacity 500ms var(--ease);
  touch-action: pan-y;
}
.object3d__stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
.object3d.is-ready .object3d__fallback {
  opacity: 0;
}
.object3d.is-ready .object3d__stage {
  opacity: 1;
}
</style>
