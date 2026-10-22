import { onMounted, onBeforeUnmount } from "vue";
export function useReveal() {
  let observer: IntersectionObserver | undefined;
  let mutations: MutationObserver | undefined;
  const observed = new WeakSet<Element>();
  function observe() {
    document
      .querySelectorAll<HTMLElement>(".reveal, [data-reveal]")
      .forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        observer?.observe(element);
      });
  }
  onMounted(() => {
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    document.documentElement.classList.add("motion-ready");
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          // Vue owns class bindings; a separate attribute survives reactive updates.
          entry.target.setAttribute("data-visible", "");
          observer?.unobserve(entry.target);
        });
      },
      { threshold: 0.08 },
    );
    observe();
    mutations = new MutationObserver(observe);
    const main = document.getElementById("main-content");
    if (main) mutations.observe(main, { childList: true, subtree: true });
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
    mutations?.disconnect();
    document.documentElement.classList.remove("motion-ready");
  });
}
