<script setup lang="ts">
import { PhArrowUpRight } from "@phosphor-icons/vue";
</script>
<template>
  <section class="not-found frame section-pad route-page">
    <span class="eyebrow red">[404] Fora de quadro</span>
    <h1>Esta ideia ainda<br />não está <em>por aqui.</em></h1>
    <p>A página que você procura não foi encontrada.</p>
    <RouterLink to="/#projetos" class="btn btn-primary"
      >Explorar projetos <PhArrowUpRight
    /></RouterLink>
  </section>
</template>
<style scoped>
.not-found {
  min-height: 550px;
  padding-top: 70px;
}
.not-found > .eyebrow {
  color: var(--red-light);
}
h1 {
  font: 600 clamp(44px, 7vw, 100px)/1 var(--display);
  margin: 35px 0;
}
h1 em {
  font: 500 italic 1.1em var(--editorial);
  color: var(--red);
}
p {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 30px;
}
</style>
