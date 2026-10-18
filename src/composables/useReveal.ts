import { onMounted, onBeforeUnmount } from "vue";
export function useReveal() {
  let observer: IntersectionObserver | undefined;
  onMounted(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("motion-ready");
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer?.observe(element));
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
    document.documentElement.classList.remove("motion-ready");
  });
}
