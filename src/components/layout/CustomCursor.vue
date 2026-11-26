<script setup lang="ts">
// Cursor personalizado: ponto que segue o mouse na hora e anel com atraso (lerp).
// Só liga com mouse (hover + pointer: fine) e sem prefers-reduced-motion;
// em toque, teclado ou movimento reduzido o cursor do sistema continua.
import { onBeforeUnmount, onMounted, ref } from "vue";

const enabled = ref(false);
const label = ref("");
const dot = ref<HTMLElement>();
const ring = ref<HTMLElement>();

const RING_LERP = 0.18;
const RING_IDLE = 36 / 64; // o anel é desenhado com 64 px e reduzido por escala
const INTERACTIVE = "a, button, summary, [role='button'], [data-cursor]";
const TEXT_FIELDS = "input, textarea, select, [contenteditable='true']";

let frame = 0;
let mouseX = -100;
let mouseY = -100;
let ringX = -100;
let ringY = -100;
let ringScale = RING_IDLE;
let targetScale = RING_IDLE;
let media: MediaQueryList | undefined;
let motion: MediaQueryList | undefined;

const render = () => {
  ringX += (mouseX - ringX) * RING_LERP;
  ringY += (mouseY - ringY) * RING_LERP;
  ringScale += (targetScale - ringScale) * RING_LERP;
  if (dot.value) dot.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  if (ring.value)
    ring.value.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
  frame = requestAnimationFrame(render);
};

const onMove = (event: PointerEvent) => {
  if (event.pointerType !== "mouse") return;
  mouseX = event.clientX;
  mouseY = event.clientY;
  document.documentElement.classList.remove("cursor-hidden");
};

const onOver = (event: PointerEvent) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  if (target.closest(TEXT_FIELDS)) {
    // Campos de texto usam o cursor de texto do sistema.
    document.documentElement.classList.add("cursor-hidden");
    return;
  }
  document.documentElement.classList.remove("cursor-hidden");
  const interactive = target.closest<HTMLElement>(INTERACTIVE);
  label.value = interactive ? (interactive.dataset.cursor ?? "VER") : "";
  targetScale = interactive ? 1 : RING_IDLE;
};

const onLeaveWindow = () => document.documentElement.classList.add("cursor-hidden");

const enable = () => {
  if (enabled.value) return;
  enabled.value = true;
  document.documentElement.classList.add("has-custom-cursor", "cursor-hidden");
  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerover", onOver, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeaveWindow);
  frame = requestAnimationFrame(render);
};

const disable = () => {
  if (!enabled.value) return;
  enabled.value = false;
  cancelAnimationFrame(frame);
  document.documentElement.classList.remove("has-custom-cursor", "cursor-hidden");
  window.removeEventListener("pointermove", onMove);
  document.removeEventListener("pointerover", onOver);
  document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
};

const sync = () => (media?.matches && !motion?.matches ? enable() : disable());

onMounted(() => {
  media = window.matchMedia("(hover: hover) and (pointer: fine)");
  motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", sync);
  motion.addEventListener("change", sync);
  sync();
});

onBeforeUnmount(() => {
  media?.removeEventListener("change", sync);
  motion?.removeEventListener("change", sync);
  disable();
});
</script>

<template>
  <div v-if="enabled" class="cursor" aria-hidden="true">
    <div ref="ring" class="cursor__ring" :class="{ 'is-active': label }">
      <span class="cursor__label">{{ label }}</span>
    </div>
    <div ref="dot" class="cursor__dot" :class="{ 'is-hidden': label }"></div>
  </div>
</template>

<style scoped>
.cursor {
  pointer-events: none;
}
.cursor__dot,
.cursor__ring {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  pointer-events: none;
  will-change: transform;
  transition: opacity 150ms var(--ease);
}
.cursor__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f2eee6;
  mix-blend-mode: difference;
}
/* Desenhado em 64 px; no estado normal a escala o reduz a 36 px. */
.cursor__ring {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border: 1.5px solid #f2eee6;
  border-radius: 50%;
  mix-blend-mode: difference;
  transition:
    opacity 150ms var(--ease),
    background-color 200ms var(--ease),
    border-color 200ms var(--ease);
}
.cursor__ring.is-active {
  border-color: #ff2e1f;
  background: #ff2e1f;
}
.cursor__label {
  font: 400 0.6875rem / 1 "Anonymous Pro", var(--font-mono);
  letter-spacing: 0.08em;
  color: #f2eee6;
  opacity: 0;
  transition: opacity 150ms var(--ease);
}
.cursor__ring.is-active .cursor__label {
  opacity: 1;
}
.cursor__dot.is-hidden {
  opacity: 0;
}
:global(html.cursor-hidden) .cursor__dot,
:global(html.cursor-hidden) .cursor__ring {
  opacity: 0;
}
</style>
