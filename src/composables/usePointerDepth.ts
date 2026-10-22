import { ref, onBeforeUnmount, onMounted } from "vue";

/** Local, pointer-only depth. No scroll listener or animation loop when idle. */
export function usePointerDepth() {
  const surface = ref<HTMLElement>();
  let frame = 0;
  let preference: MediaQueryList | undefined;
  function reset() {
    cancelAnimationFrame(frame);
    for (const variable of ["--depth-x", "--depth-y", "--tilt-x", "--tilt-y"])
      surface.value?.style.removeProperty(variable);
  }
  function move(event: PointerEvent) {
    if (event.pointerType !== "mouse" || preference?.matches) return;
    const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      surface.value?.style.setProperty("--depth-x", `${x * 20}px`);
      surface.value?.style.setProperty("--depth-y", `${y * 14}px`);
      surface.value?.style.setProperty("--tilt-x", `${-y * 10}deg`);
      surface.value?.style.setProperty("--tilt-y", `${x * 14}deg`);
    });
  }
  onMounted(() => {
    preference = matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", reset);
  });
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame);
    preference?.removeEventListener("change", reset);
  });
  return { surface, move, reset };
}
