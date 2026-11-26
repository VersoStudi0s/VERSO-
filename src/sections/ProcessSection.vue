<script setup lang="ts">
import SectionHeading from "../components/ui/SectionHeading.vue";
import AppIcon from "../components/ui/AppIcon.vue";
import ConversationLink from "../components/ui/ConversationLink.vue";
import { processSteps } from "../content/process";
import { commercial, downPaymentText } from "../config/commercial";
</script>

<template>
  <section id="como-funciona" class="section process" aria-labelledby="processo-title">
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
          data-reveal
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

      <div class="prototype" data-reveal>
        <div class="prototype__head">
          <p class="label prototype__label">O protótipo grátis, sem letra miúda</p>
          <h3 class="display prototype__title">Uma prévia pra você decidir com calma</h3>
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
.process {
  background: var(--graphite);
}
.steps {
  display: grid;
  counter-reset: none;
  border-top: 1px solid var(--line);
}
.step {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 14px;
  padding-block: 20px;
  border-bottom: 1px solid var(--line);
}
.step__number {
  font: 400 2.2rem / 1 var(--font-display);
  color: #77727c;
}
.step--free .step__number,
.step--payment .step__number {
  color: var(--red);
}
.step__title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font: 700 1.15rem / 1.3 var(--font-body);
}
.step__tag {
  padding: 3px 7px 2px;
  border-radius: 3px;
  background: var(--red);
  color: #120607;
  font: 400 0.6875rem / 1.2 var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.step__tag--pay {
  background: var(--paper);
  color: var(--ink);
}
.step__text {
  margin-top: 4px;
  color: var(--paper-dim);
  font-size: var(--text-sm);
}

/* Bloco do protótipo: papel claro, o único da página */
.prototype {
  display: grid;
  gap: 24px;
  margin-top: clamp(40px, 7vw, 72px);
  padding: clamp(24px, 4vw, 44px);
  border-radius: 2px;
  background: var(--paper);
  color: var(--ink);
  box-shadow: 0 20px 50px rgb(0 0 0 / 0.35);
}
.prototype__label {
  color: var(--red-deep);
}
.prototype__title {
  margin-block: 10px 12px;
  font-size: clamp(2rem, 5vw, 3rem);
}
.prototype__head p:last-child {
  max-width: 60ch;
  color: #3b3638;
}
.prototype__cols {
  display: grid;
  gap: 20px;
}
.prototype__col-title {
  margin-bottom: 8px;
  font-weight: 700;
}
.prototype__cols ul {
  display: grid;
  gap: 8px;
}
.prototype__cols li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.prototype__cols svg {
  margin-top: 3px;
  color: #1f7a45;
}
.prototype__excludes svg {
  color: var(--red-deep);
}
.prototype__payment {
  padding-top: 16px;
  border-top: 1px solid #d8cfc9;
  font-size: var(--text-sm);
  color: #3b3638;
}
.prototype__cta {
  justify-self: start;
}
@media (min-width: 720px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 40px;
  }
  .prototype__cols {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1100px) {
  .steps {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 28px;
  }
  .step {
    grid-template-columns: 1fr;
    align-content: start;
    gap: 10px;
    padding-block: 24px 28px;
  }
  .step__number {
    font-size: 3rem;
  }
  .prototype {
    grid-template-columns: 1.1fr 1fr;
    column-gap: 56px;
    transform: rotate(-0.6deg);
  }
  .prototype__head {
    grid-row: span 3;
  }
}
</style>
