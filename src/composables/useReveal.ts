import { onBeforeUnmount, onMounted } from "vue";

/** Revela elementos [data-reveal] quando entram na tela. Sem JS, tudo já aparece. */
export const useReveal = () => {
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    elements.forEach((element) => observer?.observe(element));
  });

  onBeforeUnmount(() => observer?.disconnect());
};
