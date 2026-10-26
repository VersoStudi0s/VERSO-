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
        const candidate = navigation.find((item) =>
          visibleSections.has(item.id),
        );
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
  if (innerWidth >= 1200) open.value = false;
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
    <RouterLink
      to="/#inicio"
      class="wordmark"
      aria-label="VERSO, início"
      :inert="open"
      >VERSO<span>*</span></RouterLink
    >
    <nav :inert="open" class="desktop-nav" aria-label="Navegação principal">
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
    <RouterLink to="/#contato" class="header-budget text-link" :inert="open"
      >Pedir orçamento <PhArrowUpRight aria-hidden="true"
    /></RouterLink>
    <button
      ref="menuButton"
      class="menu-toggle"
      :aria-expanded="open"
      aria-controls="mobile-menu"
      :aria-label="open ? 'Fechar menu' : 'Abrir menu'"
      @click="open = !open"
    >
      <span class="menu-label" aria-hidden="true">{{
        open ? "Fechar" : "Menu"
      }}</span
      ><PhX v-if="open" :size="27" weight="light" /><PhList
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
        aria-label="Menu de navegação"
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
  margin: auto;
  height: 100px;
  padding: 0 var(--gutter);
  display: flex;
  align-items: center;
  gap: 30px;
  z-index: 30;
  transition:
    background 0.3s,
    height 0.3s,
    border-color 0.3s;
  border-bottom: 1px solid transparent;
}
.wordmark {
  font: 500 48px/0.8 var(--editorial);
  letter-spacing: -3px;
  white-space: nowrap;
}
.wordmark > span {
  color: var(--red);
  font-size: 51px;
  position: relative;
  top: 4px;
}
.desktop-nav {
  display: flex;
  gap: clamp(15px, 1.4vw, 27px);
  margin: auto;
}
.desktop-nav a {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 5px;
  font: 10px var(--mono);
  color: var(--muted);
  text-transform: uppercase;
  padding: 18px 0;
  white-space: nowrap;
  transition: color 0.25s;
}
.desktop-nav a > span {
  font-size: 8px;
  color: var(--subtle);
}
.desktop-nav a::after {
  content: "";
  position: absolute;
  height: 1px;
  bottom: 7px;
  left: 0;
  right: 0;
  background: var(--red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--ease);
}
.desktop-nav a.active,
.desktop-nav a:hover {
  color: var(--red-light);
}
.desktop-nav a.active::after,
.desktop-nav a:hover::after {
  transform: scaleX(1);
}
.header-budget {
  font-size: 9px;
  min-height: 44px;
  gap: 9px;
  white-space: nowrap;
  color: var(--pink);
}
.menu-toggle {
  border: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  min-width: 44px;
  min-height: 44px;
  margin-right: -10px;
}
.menu-label {
  font: 8px var(--mono);
  text-transform: uppercase;
}
.site-header.scrolled,
.site-header.is-open {
  position: fixed;
  top: 0;
  background: #0b090cf5;
  backdrop-filter: blur(16px);
  height: 76px;
  border: 1px solid var(--line);
  border-top: 0;
}
.site-header.scrolled .wordmark {
  font-size: 40px;
}
.site-header.is-open {
  /* A filtered ancestor would constrain the fixed menu to the header height. */
  backdrop-filter: none;
}
.mobile-menu {
  position: fixed;
  inset: 95px 23px 23px;
  padding: 45px max(35px, 8vw);
  overflow: auto;
  background: linear-gradient(120deg, #21151b, #0b090c 70%);
  border: 1px solid var(--line);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 75px;
  align-content: start;
  z-index: 40;
}
.mobile-menu > .eyebrow {
  grid-column: 1/-1;
  margin-bottom: 25px;
  color: var(--pink);
}
.mobile-menu > a {
  display: flex;
  align-items: center;
  gap: 25px;
  border-bottom: 1px solid var(--line);
  min-height: 75px;
  padding: 15px 0;
  font: 600 clamp(35px, 4.2vw, 70px) / 1.1 var(--display);
  text-transform: uppercase;
  transition:
    color 0.3s,
    padding-left 0.3s;
}
.mobile-menu > a:hover,
.mobile-menu > a[aria-current] {
  color: var(--red-light);
  padding-left: 10px;
}
.mobile-menu > a svg {
  margin-left: auto;
  font-size: 28px;
  color: var(--red);
}
.mobile-menu > a > .micro {
  font-size: 10px;
}
.mobile-menu > p {
  grid-column: 1/-1;
  margin-top: 35px;
}
.menu-enter-active,
.menu-leave-active {
  transition:
    clip-path 0.4s var(--ease),
    opacity 0.3s;
}
.menu-enter-from,
.menu-leave-to {
  clip-path: inset(0 0 100%);
  opacity: 0;
}
.menu-enter-to,
.menu-leave-from {
  clip-path: inset(0);
  opacity: 1;
}
@media (min-width: 1600px) {
  .site-header {
    top: 27px;
    left: 33px;
    right: 33px;
  }
}
@media (max-width: 1199px) {
  .desktop-nav {
    display: none;
  }
  .header-budget {
    margin-left: auto;
  }
  .site-header {
    height: 90px;
  }
  .mobile-menu {
    inset: 90px 23px 23px;
  }
}
@media (max-width: 767px) {
  .site-header {
    top: 11px;
    left: 11px;
    right: 11px;
    padding: 0 19px;
    height: 75px;
    gap: 18px;
  }
  .wordmark {
    font-size: 35px;
    letter-spacing: -2px;
  }
  .wordmark > span {
    font-size: 36px;
  }
  .header-budget {
    font-size: 8px;
    gap: 6px;
  }
  .header-budget svg {
    display: none;
  }
  .menu-toggle {
    padding: 9px;
    margin-right: -9px;
  }
  .menu-label {
    display: none;
  }
  .site-header.scrolled,
  .site-header.is-open {
    height: 68px;
  }
  .site-header.scrolled .wordmark {
    font-size: 35px;
  }
  .mobile-menu {
    inset: 68px 10px 10px;
    padding: 25px 24px;
    grid-template-columns: 1fr;
    gap: 0;
  }
  .mobile-menu > a {
    font-size: 43px;
    min-height: 63px;
    padding: 11px 0;
    gap: 22px;
  }
  .mobile-menu > .eyebrow {
    margin-bottom: 14px;
    font-size: 8px;
  }
  .mobile-menu > p {
    margin-top: 22px;
    font-size: 8px;
  }
}
</style>
