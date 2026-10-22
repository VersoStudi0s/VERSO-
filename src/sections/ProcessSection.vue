<script setup lang="ts">
import { PhArrowUpRight } from "@phosphor-icons/vue";
const steps = [
  {
    title: "Entendimento",
    text: "Uma conversa breve para conhecer seu objetivo e seu público.",
  },
  {
    title: "Proposta",
    text: "Entrega, escopo, prazo e orçamento definidos antes de começar.",
  },
  {
    title: "Criação",
    text: "Desenvolvimento visual e técnico, com as revisões combinadas.",
  },
  {
    title: "Entrega",
    text: "Testes, ajustes finais e os arquivos acordados para o projeto.",
  },
];
</script>
<template>
  <section
    id="processo"
    class="process frame section-pad reveal"
    aria-labelledby="process-title"
  >
    <div class="section-topline">
      <span class="eyebrow">Como trabalho</span
      ><span class="section-number">[04]</span>
    </div>
    <h2 id="process-title">
      Uma ideia bem executada<br />começa com <em>clareza.</em>
    </h2>
    <ol class="process-steps">
      <li v-for="(step, index) in steps" :key="step.title">
        <span class="step-number" aria-hidden="true">0{{ index + 1 }}</span>
        <div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </div>
      </li>
    </ol>
    <p class="process-note">
      Os detalhes do projeto são combinados antes do início do trabalho.
    </p>
    <RouterLink to="/#contato" class="text-link"
      >Vamos definir seu projeto <PhArrowUpRight
    /></RouterLink>
  </section>
</template>
<style scoped>
.process h2 {
  font: 600 clamp(34px, 3.1vw, 52px) / 1.05 var(--display);
  letter-spacing: -0.02em;
}
.process h2 em {
  font: 500 italic 1.25em/0.9 var(--editorial);
  color: var(--red);
}
.process-steps {
  list-style: none;
  padding: 0;
  margin: 30px 0 24px;
}
.process-steps li {
  display: flex;
  gap: 22px;
  padding: 20px 0;
  border-bottom: 1px solid var(--line-soft);
}
.step-number {
  color: var(--red-light);
  font: 500 29px/1 var(--editorial);
  padding-top: 3px;
}
.process-steps h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}
.process-steps p {
  font-size: 13px;
  line-height: 1.65;
  color: var(--muted);
}
.process-note {
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 16px;
}
.process .text-link {
  min-height: 44px;
  font-size: 10px;
  color: var(--pink);
}
</style>
