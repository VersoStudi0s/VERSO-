<script setup lang="ts">
import { RouterLink } from "vue-router";
import AppIcon from "../components/ui/AppIcon.vue";
import { navigation } from "../content/navigation";
</script>

<template>
  <section class="section container notfound theme-dark" aria-labelledby="nf-title">
    <p class="label">Erro 404</p>
    <h1 id="nf-title" class="display">Essa página <span class="accent-word">não existe</span></h1>
    <div class="notfound__impact">
      <p>O link pode ter mudado. Os projetos e o contato continuam no mesmo lugar.</p>
      <RouterLink to="/" class="btn notfound__btn">Voltar para o início</RouterLink>
    </div>
    <nav class="notfound__paper theme-light" aria-label="Atalhos">
      <p class="label">Talvez você procure</p>
      <ul role="list">
        <li v-for="item in navigation" :key="item.id">
          <RouterLink :to="{ path: '/', hash: `#${item.id}` }" class="link-arrow">
            {{ item.label }} <AppIcon name="arrow-right" :size="18" />
          </RouterLink>
        </li>
      </ul>
    </nav>
  </section>
</template>

<style scoped>
.notfound {
  display: grid;
  gap: var(--s-5);
  justify-items: start;
  align-content: center;
}
.notfound h1 {
  font-size: var(--title-lg);
}
/* Painel de impacto: vermelho, texto preto (5,3:1). */
.notfound__impact {
  display: grid;
  gap: var(--s-4);
  justify-items: start;
  width: 100%;
  padding: clamp(var(--s-6), 5vw, var(--s-9));
  border-radius: var(--radius-lg);
  background: var(--red);
  color: var(--black);
  font-size: var(--text-lg);
}
.notfound__btn {
  background: var(--black);
  color: var(--beige);
}
.notfound__btn:hover {
  background: var(--black-3);
}
.notfound__paper {
  width: 100%;
  padding: clamp(var(--s-6), 5vw, var(--s-9));
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}
.notfound__paper ul {
  display: grid;
  gap: var(--s-1) var(--s-7);
  margin-top: var(--s-3);
}
@media (min-width: 1000px) {
  .notfound__paper {
    padding: var(--s-11) var(--s-10);
  }
}
@media (min-width: 720px) {
  .notfound__paper ul {
    grid-template-columns: repeat(3, auto);
    justify-content: start;
  }
}
</style>
