<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import BrandLogo from "./BrandLogo.vue";
import AppIcon from "../ui/AppIcon.vue";
import ConversationLink from "../ui/ConversationLink.vue";
import { navigation } from "../../content/navigation";

const route = useRoute();
const open = ref(false);
const menuButton = ref<HTMLButtonElement>();
const panel = ref<HTMLElement>();

const close = (returnFocus = true) => {
  if (!open.value) return;
  open.value = false;
  if (returnFocus) menuButton.value?.focus();
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") return close();
  if (event.key !== "Tab" || !panel.value) return;
  const focusable = panel.value.querySelectorAll<HTMLElement>("a, button");
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
};

watch(open, async (isOpen) => {
  document.documentElement.classList.toggle("menu-open", isOpen);
  if (isOpen) {
    document.addEventListener("keydown", onKeydown);
    await nextTick();
    panel.value?.querySelector<HTMLElement>("a")?.focus();
  } else {
    document.removeEventListener("keydown", onKeydown);
  }
});
watch(() => route.fullPath, () => close(false));
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
  document.documentElement.classList.remove("menu-open");
});
</script>

<template>
  <header class="header">
    <div class="container header__bar">
      <RouterLink to="/" class="header__logo" @click="close(false)">
        <BrandLogo />
        <span class="visually-hidden">, página inicial</span>
      </RouterLink>

      <nav class="header__nav" aria-label="Principal">
        <ul role="list">
          <li v-for="item in navigation" :key="item.id">
            <RouterLink :to="{ path: '/', hash: `#${item.id}` }">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <ConversationLink
          position="cabecalho"
          intent="prototipo"
          label="Pedir protótipo"
          class="header__cta"
        />
        <button
          ref="menuButton"
          type="button"
          class="header__menu-btn"
          :aria-expanded="open"
          aria-controls="menu-mobile"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" :size="24" />
          <span class="visually-hidden">{{ open ? "Fechar menu" : "Abrir menu" }}</span>
        </button>
      </div>
    </div>

    <div v-show="open" id="menu-mobile" ref="panel" class="menu" role="dialog" aria-modal="true" aria-label="Menu">
      <nav aria-label="Menu principal">
        <ol role="list" class="menu__list">
          <li v-for="(item, index) in navigation" :key="item.id">
            <RouterLink :to="{ path: '/', hash: `#${item.id}` }" @click="close(false)">
              <span class="label">0{{ index + 2 }}</span>{{ item.label }}
            </RouterLink>
          </li>
        </ol>
      </nav>
      <ConversationLink position="menu" intent="prototipo" block />
      <button type="button" class="visually-hidden" @click="close()">Fechar menu</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--black);
  border-bottom: 1px solid var(--line);
}
.header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-4);
  height: var(--header-h);
}
.header__logo {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  text-decoration: none;
}
.header__nav {
  display: none;
}
.header__actions {
  display: flex;
  align-items: center;
  gap: var(--s-2);
}
.header__cta {
  min-height: 44px;
  padding: var(--s-2) var(--s-4);
  font-size: var(--text-sm);
  box-shadow: none;
}
.header__cta :deep(svg) {
  display: none;
}
.header__menu-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: none;
  cursor: pointer;
  transition:
    border-color var(--fast) var(--ease),
    transform var(--fast) var(--ease);
}
.header__menu-btn:hover {
  border-color: var(--fg);
}
.header__menu-btn:active {
  transform: scale(0.94);
}
.menu {
  position: fixed;
  inset: var(--header-h) 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--s-7);
  padding: var(--s-7) var(--gutter) calc(var(--s-7) + env(safe-area-inset-bottom));
  background: var(--black);
  overflow-y: auto;
}
.menu__list a {
  display: flex;
  align-items: baseline;
  gap: var(--s-4);
  padding: var(--s-3) 0;
  border-bottom: 1px solid var(--line);
  font: 400 2.4rem / 1.05 var(--font-display);
  text-transform: uppercase;
  text-decoration: none;
  transition: color var(--fast) var(--ease);
}
.menu__list a:active {
  color: var(--red);
}
.menu__list .label {
  color: var(--link);
}
@media (min-width: 960px) {
  .header__nav {
    display: block;
  }
  .header__nav ul {
    display: flex;
    gap: clamp(var(--s-4), 2.4vw, var(--s-7));
    font-size: var(--text-sm);
  }
  .header__nav a {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    text-decoration: none;
    color: var(--fg-muted);
    background: linear-gradient(var(--red), var(--red)) bottom left / 0 2px no-repeat;
    transition:
      color var(--fast) var(--ease),
      background-size var(--fast) var(--ease);
  }
  .header__nav a:hover {
    color: var(--fg);
    background-size: 100% 2px;
  }
  .header__menu-btn,
  .menu {
    display: none !important;
  }
}
</style>
