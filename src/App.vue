<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import SiteHeader from "./components/layout/SiteHeader.vue";
import SiteFooter from "./components/layout/SiteFooter.vue";
import FloatingContact from "./components/layout/FloatingContact.vue";
import ConsentBanner from "./components/layout/ConsentBanner.vue";
import TornEdge from "./components/ui/TornEdge.vue";

// Rodapé vermelho só na página inicial (longa). Em páginas curtas ele passaria de 10% da tela.
const route = useRoute();
const impactFooter = computed(() => route.path === "/");
</script>

<template>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <SiteHeader />
  <main id="conteudo" tabindex="-1">
    <RouterView />
  </main>
  <TornEdge v-if="impactFooter" color="var(--red)" />
  <SiteFooter :impact="impactFooter" />
  <FloatingContact />
  <ConsentBanner />
</template>
