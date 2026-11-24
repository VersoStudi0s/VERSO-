<script setup lang="ts">
const steps = [
  {
    title: "Conversa",
    text: "Entendemos o seu negócio, o seu público e o que você precisa resolver.",
  },
  {
    title: "Protótipo grátis",
    text: "Montamos um protótipo simples, sem custo, para você ver a ideia na prática.",
  },
  {
    title: "Validação e contrato",
    text: "Ajustamos o protótipo com você e fechamos escopo, prazo e valor, com entrada de 40% a 50%.",
  },
  {
    title: "Desenvolvimento",
    text: "Construímos o projeto completo e validamos com você antes de finalizar.",
  },
  {
    title: "Entrega",
    text: "Após o pagamento do restante, entregamos tudo publicado e funcionando.",
  },
  {
    title: "Manutenção",
    text: "Depois da entrega, ajustes e melhorias são feitos sob orçamento.",
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
      <span class="eyebrow">Como trabalhamos</span
      ><span class="section-number">[04]</span>
    </div>
    <h2 id="process-title">
      Uma ideia bem executada<br />começa com <em>clareza</em>
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
      Você só paga depois de aprovar o protótipo e combinar todos os detalhes.
    </p>
    <RouterLink to="/#contato" class="text-link"
      >Vamos definir seu projeto</RouterLink>
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
  font-size: 11px;
  color: var(--pink);
}
</style>
