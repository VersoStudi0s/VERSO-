<script setup lang="ts">
import { RouterView } from "vue-router";
import SiteHeader from "./components/layout/SiteHeader.vue";
import SiteFooter from "./components/layout/SiteFooter.vue";
import FloatingContact from "./components/layout/FloatingContact.vue";
import ConsentBanner from "./components/layout/ConsentBanner.vue";
</script>

<template>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <SiteHeader />
  <main id="conteudo" tabindex="-1">
    <RouterView />
  </main>
  <SiteFooter />
  <FloatingContact />
  <ConsentBanner />
</template>
