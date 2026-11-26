<script setup lang="ts">
import { RouterLink } from "vue-router";
import SectionHeading from "../components/ui/SectionHeading.vue";
import AppIcon from "../components/ui/AppIcon.vue";
import ConversationLink from "../components/ui/ConversationLink.vue";
import PricingBlock from "./PricingBlock.vue";
import { serviceCategories, services, type ServiceCategory } from "../content/services";
import { pricingPackages } from "../content/pricing";
import { track } from "../lib/analytics";

const categories = Object.keys(serviceCategories) as ServiceCategory[];
const byCategory = (category: ServiceCategory) =>
  services.filter((service) => service.category === category);
const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
</script>

<template>
  <section id="servicos" class="section services theme-light" aria-labelledby="servicos-title">
    <div class="container">
      <SectionHeading id="servicos-title" number="02" label="Serviços">
        O que a gente <em class="accent-word">faz</em> pelo seu negócio
        <template #lead>
          Seis serviços, todos entregues pela equipe. Se o seu caso não estiver aqui, conta pra gente: se não for
          algo que façamos bem, a gente fala na hora.
        </template>
      </SectionHeading>

      <div v-for="category in categories" :key="category" class="services__group">
        <div class="services__group-head">
          <h3 class="label services__group-title">{{ serviceCategories[category].label }}</h3>
          <p class="services__group-lead">{{ serviceCategories[category].lead }}</p>
        </div>
        <ul role="list" class="services__list">
          <li v-for="service in byCategory(category)" :key="service.id" class="card theme-dark">
            <h4 class="card__title">{{ service.name }}</h4>
            <p class="card__summary">{{ service.summary }}</p>
            <p class="card__problem"><span class="label card__problem-label">Resolve</span>{{ service.problem }}</p>
            <div class="card__includes">
              <p class="label">Inclui</p>
              <ul role="list">
                <li v-for="item in service.includes" :key="item">
                  <AppIcon name="check" :size="16" />{{ item }}
                </li>
              </ul>
            </div>
            <p v-if="service.note" class="card__note">{{ service.note }}</p>
            <div class="card__footer">
              <p v-if="service.priceFrom" class="card__price">
                a partir de <strong>{{ formatPrice(service.priceFrom) }}</strong>
              </p>
              <RouterLink
                :to="{ path: '/', query: { servico: service.id }, hash: '#contato' }"
                class="link-arrow"
                @click="track('pedido_orcamento', { servico: service.id, posicao: 'servicos' })"
              >
                Pedir orçamento <AppIcon name="arrow-right" :size="18" />
                <span class="visually-hidden">de {{ service.name }}</span>
              </RouterLink>
            </div>
          </li>
        </ul>
      </div>

      <PricingBlock v-if="pricingPackages.length" :packages="pricingPackages" />

      <aside class="services__cta">
        <p>
          <strong>Não sabe por onde começar?</strong> Normal. Manda uma mensagem contando o que você faz e a gente
          sugere o primeiro passo.
        </p>
        <ConversationLink position="servicos" variant="light" />
      </aside>
    </div>
  </section>
</template>

<style scoped>
.services__group {
  display: grid;
  gap: var(--s-5);
  padding-block: var(--s-7);
  border-top: 1px solid var(--line);
}
.services__group-title {
  color: var(--link);
}
.services__group-lead {
  margin-top: var(--s-2);
  font: 400 var(--title-md) / 1.05 var(--font-display);
  text-transform: uppercase;
}
.services__list {
  display: grid;
  gap: var(--s-4);
}
.card {
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
  padding: var(--s-6) var(--s-5);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface);
  transition:
    box-shadow var(--fast) var(--ease),
    transform var(--fast) var(--ease);
}
.card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}
.card__title {
  font: 600 1.25rem / 1.25 var(--font-body);
}
.card__summary {
  color: var(--fg-muted);
}
.card__problem {
  display: grid;
  gap: var(--s-1);
  font-size: var(--text-sm);
}
.card__problem-label {
  color: var(--link);
}
.card__includes ul {
  display: grid;
  gap: var(--s-2);
  margin-top: var(--s-2);
  font-size: var(--text-sm);
}
.card__includes li {
  display: flex;
  gap: var(--s-2);
  align-items: flex-start;
}
.card__includes svg {
  flex: none;
  margin-top: 3px;
  color: var(--link);
  stroke-width: 2.25;
}
.card__note {
  font-size: var(--text-sm);
  color: var(--fg-muted);
}
.card__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-2);
  margin-top: auto;
  padding-top: var(--s-2);
}
.card__price {
  font-size: var(--text-sm);
  color: var(--fg-muted);
}

/* Bloco de impacto: vermelho sólido, texto preto (5,3:1). */
.services__cta {
  --r-outer: var(--radius-lg);
  --pad: var(--s-6);
  display: grid;
  gap: var(--s-5);
  margin-top: var(--s-7);
  padding: var(--pad);
  border-radius: var(--r-outer);
  background: var(--red);
  color: var(--black);
  box-shadow: var(--shadow-warm);
}
.services__cta strong {
  display: block;
  margin-bottom: var(--s-2);
  font: 400 1.6rem / 1.05 var(--font-display);
  text-transform: uppercase;
}
.services__cta :deep(.btn) {
  background: var(--black);
  color: var(--beige);
  box-shadow: var(--shadow-md);
}
.services__cta :deep(.btn:hover) {
  background: var(--black-3);
}
@media (min-width: 720px) {
  .services__list {
    grid-template-columns: repeat(2, 1fr);
  }
  .services__cta {
    --pad: var(--s-7);
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}
@media (min-width: 1100px) {
  .services__group {
    grid-template-columns: 260px 1fr;
    gap: var(--s-8);
    padding-block: var(--s-8);
  }
  .services__list {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}
@media (prefers-reduced-motion: reduce) {
  .card,
  .card:hover {
    transition: none;
    transform: none;
  }
}
</style>
