<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRoute } from "vue-router";
import { PhList, PhX, PhArrowUpRight } from "@phosphor-icons/vue";
import { navigation } from "../data/site";
const route = useRoute();
const open = ref(false),
  scrolled = ref(false),
  active = ref("inicio");
const menuButton = ref<HTMLButtonElement>(),
  menu = ref<HTMLElement>();
let observer: IntersectionObserver | undefined;
const visibleSections = new Set<string>();
const scroll = () => {
  scrolled.value = window.scrollY > 40;
};
function keyboard(event: KeyboardEvent) {
  if (!open.value) return;
  if (event.key === "Escape") {
    open.value = false;
    menuButton.value?.focus();
  }
  if (event.key === "Tab") {
    const links = menu.value?.querySelectorAll<HTMLAnchorElement>("a");
    if (!links?.length) return;
    if (event.shiftKey && document.activeElement === links[0]) {
      event.preventDefault();
      menuButton.value?.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === links[links.length - 1]
    ) {
      event.preventDefault();
      menuButton.value?.focus();
    } else if (document.activeElement === menuButton.value) {
      event.preventDefault();
      (event.shiftKey ? links[links.length - 1] : links[0])?.focus();
    }
  }
}
watch(open, async (value) => {
  document.body.classList.toggle("menu-open", value);
  document.getElementById("main-content")?.toggleAttribute("inert", value);
  document.querySelector("footer")?.toggleAttribute("inert", value);
  if (value) {
    await nextTick();
    menu.value?.querySelector("a")?.focus();
  }
});
watch(
  () => route.fullPath,
  () => {
    open.value = false;
    const target = route.hash.slice(1);
    if (navigation.some((item) => item.id === target)) active.value = target;
  },
);
function observeSections() {
  observer?.disconnect();
  visibleSections.clear();
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.add(entry.target.id);
        else visibleSections.delete(entry.target.id);
      }
      const preferred = route.hash.slice(1);
      if (visibleSections.has(preferred)) active.value = preferred;
      else if (!visibleSections.has(active.value)) {
        const candidate = navigation.find((item) => visibleSections.has(item.id));
        if (candidate) active.value = candidate.id;
      }
    },
    { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
  );
  navigation.forEach((item) => {
    const element = document.getElementById(item.id);
    if (element) observer?.observe(element);
  });
}
watch(
  () => route.path,
  async () => {
    await nextTick();
    observeSections();
  },
);
function resize() {
  if (innerWidth >= 1000) open.value = false;
}
onMounted(() => {
  scroll();
  window.addEventListener("scroll", scroll, { passive: true });
  window.addEventListener("keydown", keyboard);
  window.addEventListener("resize", resize);
  observeSections();
});
onBeforeUnmount(() => {
  observer?.disconnect();
  window.removeEventListener("scroll", scroll);
  window.removeEventListener("keydown", keyboard);
  window.removeEventListener("resize", resize);
  document.body.classList.remove("menu-open");
  document.getElementById("main-content")?.removeAttribute("inert");
  document.querySelector("footer")?.removeAttribute("inert");
});
</script>
<template>
  <header class="site-header" :class="{ scrolled, 'is-open': open }">
    <RouterLink to="/#inicio" class="wordmark" aria-label="VERSO, início"
      >VERSO<span>*</span></RouterLink
    >
    <nav class="desktop-nav" aria-label="Navegação principal">
      <RouterLink
        v-for="item in navigation"
        :key="item.id"
        :to="`/#${item.id}`"
        :aria-current="
          route.path === '/' && active === item.id ? 'location' : undefined
        "
        :class="{ active: route.path === '/' && active === item.id }"
        ><span>[{{ item.number }}]</span> {{ item.label }}</RouterLink
      >
    </nav>
    <span class="header-note micro">Design + código<br />com propósito.</span>
    <button
      ref="menuButton"
      class="menu-toggle"
      :aria-expanded="open"
      aria-controls="mobile-menu"
      :aria-label="open ? 'Fechar menu' : 'Abrir menu'"
      @click="open = !open"
    >
      <PhX v-if="open" :size="27" weight="light" /><PhList
        v-else
        :size="27"
        weight="light"
      />
    </button>
    <Transition name="menu">
      <nav
        v-if="open"
        id="mobile-menu"
        ref="menu"
        class="mobile-menu"
        aria-label="Navegação mobile"
      >
        <span class="eyebrow">Explore o universo VERSO*</span>
        <RouterLink
          v-for="item in navigation"
          :key="item.id"
          :to="`/#${item.id}`"
          :aria-current="
            route.path === '/' && active === item.id ? 'location' : undefined
          "
          @click="open = false"
          ><span class="micro">[{{ item.number }}]</span>{{ item.label
          }}<PhArrowUpRight weight="light"
        /></RouterLink>
        <p class="micro">
          Criatividade é o ponto de partida.<br />O próximo passo é construir.
        </p>
      </nav>
    </Transition>
  </header>
</template>
<style scoped>
.site-header {
  position: absolute;
  top: 19px;
  left: 23px;
  right: 23px;
  max-width: 1874px;
  height: 90px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 35px;
  padding: 0 var(--gutter);
  margin: 0 auto;
  border-bottom: 1px solid transparent;
  transition:
    height 0.25s,
    background 0.25s,
    border-color 0.25s;
}
.site-header.scrolled {
  position: fixed;
  top: 0;
  background: #0d0d10f5;
  backdrop-filter: blur(14px);
  height: 72px;
  border: 1px solid var(--line);
  border-top: 0;
  border-radius: 0 0 12px 12px;
}
.wordmark {
  font: 500 39px/0.8 var(--editorial);
  letter-spacing: -2.5px;
  white-space: nowrap;
}
.wordmark span {
  color: var(--red);
  font-size: 40px;
  position: relative;
  top: 3px;
}
.desktop-nav {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2.1vw, 36px);
  margin: auto;
}
.desktop-nav a {
  font: 11px var(--mono);
  text-transform: uppercase;
  white-space: nowrap;
  position: relative;
  padding: 15px 0;
  color: var(--muted);
  transition: color 0.2s;
}
.desktop-nav a span {
  font-size: 9px;
}
.desktop-nav a::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--red);
  transition: width 0.2s;
}
.desktop-nav a.active,
.desktop-nav a:hover {
  color: var(--red-light);
}
.desktop-nav a.active::after,
.desktop-nav a:hover::after {
  width: 100%;
}
.header-note {
  font-size: 8px;
  line-height: 1.6;
}
.menu-toggle {
  border: 0;
  display: none;
  padding: 10px;
  margin-right: -10px;
}
.mobile-menu {
  position: fixed;
  inset: 79px 10px 10px;
  background: var(--black);
  border: 1px solid var(--line);
  border-radius: 0 0 12px 12px;
  padding: 30px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  z-index: 40;
}
.mobile-menu > a {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 13px 0;
  font: 600 clamp(31px, 7vh, 56px) var(--display);
  text-transform: uppercase;
  border-bottom: 1px solid var(--line-soft);
}
.mobile-menu > a svg {
  margin-left: auto;
  font-size: 26px;
  color: var(--red);
}
.mobile-menu > p {
  margin-top: auto;
  padding-top: 30px;
}
.mobile-menu > .eyebrow {
  margin-bottom: 20px;
}
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.25s,
    transform 0.25s;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
@media (min-width: 1600px) {
  .site-header {
    top: 27px;
    left: 33px;
    right: 33px;
  }
}
@media (max-width: 1150px) {
  .header-note {
    display: none;
  }
  .desktop-nav {
    gap: 20px;
    margin-right: 0;
  }
  .site-header {
    gap: 25px;
  }
}
@media (max-width: 999px) {
  .desktop-nav {
    display: none;
  }
  .menu-toggle {
    display: block;
    margin-left: auto;
  }
  .header-note {
    display: block;
    margin-left: auto;
  }
  .site-header {
    height: 78px;
  }
  .site-header.is-open {
    position: fixed;
    background: var(--black);
    top: 0;
  }
  .site-header.is-open .header-note {
    display: none;
  }
}
@media (max-width: 767px) {
  .site-header {
    top: 11px;
    left: 11px;
    right: 11px;
    padding: 0 21px;
    height: 72px;
  }
  .site-header.scrolled {
    height: 68px;
  }
  .wordmark {
    font-size: 32px;
  }
  .wordmark span {
    font-size: 35px;
  }
  .header-note {
    font-size: 7px;
  }
  .mobile-menu {
    top: 68px;
  }
}
</style>
