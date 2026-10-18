<script setup lang="ts">
import { nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
const route = useRoute();
watch(
  () => route.fullPath,
  async (_to, from) => {
    if (from === undefined) return;
    await nextTick();
    const target =
      document.getElementById(route.hash.slice(1)) ||
      document.getElementById("main-content");
    target?.setAttribute("tabindex", "-1");
    target?.focus({ preventScroll: true });
  },
);
</script>
<template>
  <a class="skip-link" href="#main-content">Pular para o conteúdo</a>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content" tabindex="-1"><RouterView /></main>
    <SiteFooter />
  </div>
</template>
