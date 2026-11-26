<script setup lang="ts">
import SectionHeading from "../components/ui/SectionHeading.vue";
import AppIcon from "../components/ui/AppIcon.vue";
import ConversationLink from "../components/ui/ConversationLink.vue";
import { processSteps } from "../content/process";
import { commercial, downPaymentText } from "../config/commercial";
</script>

<template>
  <section id="como-funciona" class="section process theme-dark" aria-labelledby="processo-title">
    <div class="container">
      <SectionHeading id="processo-title" number="04" label="Como funciona">
        Do primeiro oi à <em class="accent-word">entrega</em>
        <template #lead>
          Você sabe o que acontece em cada etapa e só paga depois de ver a proposta e aprovar o orçamento.
        </template>
      </SectionHeading>

      <ol role="list" class="steps">
        <li
          v-for="(step, index) in processSteps"
          :key="step.title"
          class="step"
          :class="{ 'step--free': step.free, 'step--payment': step.payment }"
        >
          <span class="step__number" aria-hidden="true">{{ String(index + 1).padStart(2, "0") }}</span>
          <div>
            <h3 class="step__title">
              <span class="visually-hidden">Etapa {{ index + 1 }}: </span>{{ step.title }}
              <span v-if="step.free" class="step__tag">Grátis</span>
              <span v-if="step.payment" class="step__tag step__tag--pay">Pagamento</span>
            </h3>
            <p class="step__text">{{ step.text }}</p>
          </div>
        </li>
      </ol>

      <div class="prototype theme-light">
        <span class="prototype__stamp" aria-hidden="true">Grátis</span>
        <div class="prototype__head">
          <h3 class="display prototype__title">Uma prévia pra você decidir com calma</h3>
          <p class="label prototype__label">O protótipo grátis, sem letra miúda</p>
          <p>
            É uma amostra do caminho visual que a gente propõe para o seu projeto. Serve pra você ver se gosta da
            direção antes de qualquer pagamento. Não é o projeto pronto.
          </p>
        </div>
        <div class="prototype__cols">
          <div>
            <p class="prototype__col-title">Inclui</p>
            <ul role="list">
              <li v-for="item in commercial.freePrototype.includes" :key="item">
                <AppIcon name="check" :size="18" />{{ item }}
              </li>
            </ul>
          </div>
          <div>
            <p class="prototype__col-title">Não inclui</p>
            <ul role="list" class="prototype__excludes">
              <li v-for="item in commercial.freePrototype.excludes" :key="item">
                <AppIcon name="x" :size="18" />{{ item }}
              </li>
            </ul>
          </div>
        </div>
        <p class="prototype__payment">{{ downPaymentText() }} O restante e os prazos ficam por escrito na proposta.</p>
        <ConversationLink position="processo" intent="prototipo" class="prototype__cta" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.steps {
  display: grid;
  border-top: 1px solid var(--line);
}
.step {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: var(--s-4);
  padding-block: var(--s-5);
  border-bottom: 1px solid var(--line);
}
.step__number {
  font: 400 2.2rem / 1 var(--font-display);
  color: var(--fg-subtle);
}
.step--free .step__number,
.step--payment .step__number {
  color: var(--red);
}
.step__title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--s-2);
  font: 600 1.15rem / 1.3 var(--font-body);
}
.step__tag {
  padding: var(--s-1) var(--s-2);
  border-radius: var(--radius-min);
  background: var(--red);
  color: var(--black);
  font: 400 0.6875rem / 1.2 var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.step__tag--pay {
  background: var(--beige);
}
.step__text {
  margin-top: var(--s-1);
  color: var(--fg-muted);
  font-size: var(--text-sm);
}

/* Bloco do protótipo: papel bege com carimbo vermelho em multiply. */
.prototype {
  --r-outer: var(--radius-lg);
  position: relative;
  display: grid;
  gap: var(--s-6);
  margin-top: clamp(var(--s-8), 7vw, var(--s-11));
  padding: clamp(var(--s-6), 4vw, var(--s-9));
  border-radius: var(--r-outer);
  box-shadow: var(--shadow-lg);
  isolation: isolate;
}
.prototype__stamp {
  position: absolute;
  z-index: -1;
  right: clamp(var(--s-4), 4vw, var(--s-9));
  bottom: clamp(var(--s-4), 3vw, var(--s-7));
  padding: var(--s-2) var(--s-4);
  border: 3px solid var(--red);
  border-radius: var(--radius);
  color: var(--red);
  font: 400 clamp(2rem, 6vw, 3.6rem) / 1 var(--font-display);
  text-transform: uppercase;
  transform: rotate(-8deg);
  mix-blend-mode: multiply;
}
.prototype__title {
  font-size: clamp(2rem, 5vw, 3rem);
  max-width: 14ch;
}
.prototype__label {
  margin-block: var(--s-3);
  color: var(--link);
}
.prototype__head p:last-child {
  max-width: 60ch;
  color: var(--fg-muted);
}
.prototype__cols {
  display: grid;
  gap: var(--s-5);
}
.prototype__col-title {
  margin-bottom: var(--s-2);
  font-weight: 600;
}
.prototype__cols ul {
  display: grid;
  gap: var(--s-2);
}
.prototype__cols li {
  display: flex;
  gap: var(--s-3);
  align-items: flex-start;
}
.prototype__cols svg {
  flex: none;
  margin-top: 3px;
  color: var(--fg);
  stroke-width: 2.25;
}
.prototype__excludes svg {
  color: var(--link);
}
.prototype__payment {
  padding-top: var(--s-4);
  border-top: 1px solid var(--line);
  font-size: var(--text-sm);
  color: var(--fg-muted);
}
.prototype__cta {
  justify-self: start;
}
@media (min-width: 720px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
    column-gap: var(--s-8);
  }
  .prototype__cols {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1100px) {
  .steps {
    grid-template-columns: repeat(4, 1fr);
    column-gap: var(--s-7);
  }
  .step {
    grid-template-columns: 1fr;
    align-content: start;
    gap: var(--s-3);
    padding-block: var(--s-6) var(--s-7);
  }
  .step__number {
    font-size: 3rem;
  }
  .prototype {
    grid-template-columns: 1.1fr 1fr;
    column-gap: var(--s-10);
  }
  .prototype__head {
    grid-row: span 3;
  }
}
</style>
