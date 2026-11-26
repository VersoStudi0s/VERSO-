<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="section container notfound" aria-labelledby="nf-title">
    <p class="label">Erro 404</p>
    <h1 id="nf-title" class="display">Essa página <em class="accent-word">não existe</em></h1>
    <p class="lead">O link pode ter mudado. Os projetos e o contato continuam no mesmo lugar.</p>
    <RouterLink to="/" class="btn btn-primary">Voltar para o início</RouterLink>
  </section>
</template>

<style scoped>
.notfound {
  display: grid;
  gap: 20px;
  justify-items: start;
  min-height: 60vh;
  align-content: center;
}
.notfound h1 {
  font-size: var(--title-lg);
}
</style>
