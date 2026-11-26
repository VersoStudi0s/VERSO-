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
  <section id="servicos" class="section services" aria-labelledby="servicos-title">
    <div class="container">
      <SectionHeading id="servicos-title" number="02" label="Serviços">
        O que a gente <em class="accent-word">faz</em> pelo seu negócio
        <template #lead>
          Seis serviços, todos entregues pela equipe. Se o seu caso não estiver aqui, conta pra gente: se não for
          algo que façamos bem, a gente fala na hora.
        </template>
      </SectionHeading>

      <div v-for="category in categories" :key="category" class="services__group" data-reveal>
        <div class="services__group-head">
          <h3 class="label services__group-title">{{ serviceCategories[category].label }}</h3>
          <p class="services__group-lead">{{ serviceCategories[category].lead }}</p>
        </div>
        <ul role="list" class="services__list">
          <li v-for="service in byCategory(category)" :key="service.id" class="card">
            <h4 class="card__title">{{ service.name }}</h4>
            <p class="card__summary">{{ service.summary }}</p>
            <p class="card__problem"><span class="label">Resolve</span>{{ service.problem }}</p>
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

      <aside class="services__cta" data-reveal>
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
.services {
  background: var(--graphite);
}
.services__group {
  display: grid;
  gap: 18px;
  padding-block: 32px;
  border-top: 1px solid var(--line);
}
.services__group-title {
  color: var(--red-ink);
}
.services__group-lead {
  margin-top: 6px;
  font: 400 var(--title-md) / 1.05 var(--font-display);
  text-transform: uppercase;
}
.services__list {
  display: grid;
  gap: 14px;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--graphite-2);
  transition: border-color var(--fast) var(--ease);
}
.card:hover {
  border-color: var(--line-strong);
}
.card__title {
  font: 700 1.25rem / 1.25 var(--font-body);
}
.card__summary {
  color: var(--paper-dim);
}
.card__problem {
  display: grid;
  gap: 4px;
  padding-left: 12px;
  border-left: 2px solid var(--red);
  font-size: var(--text-sm);
}
.card__includes ul {
  display: grid;
  gap: 6px;
  margin-top: 8px;
  font-size: var(--text-sm);
}
.card__includes li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
.card__includes svg {
  margin-top: 3px;
  color: var(--red-ink);
}
.card__note {
  font-size: var(--text-sm);
  font-style: italic;
  color: var(--muted);
}
.card__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
  padding-top: 8px;
}
.card__price {
  font-size: var(--text-sm);
  color: var(--paper-dim);
}
.services__cta {
  display: grid;
  gap: 18px;
  margin-top: 32px;
  padding: 24px 20px;
  border-radius: var(--radius);
  background: var(--red-deep);
}
.services__cta strong {
  display: block;
  font: 400 1.6rem / 1.05 var(--font-display);
  text-transform: uppercase;
  margin-bottom: 6px;
}
@media (min-width: 720px) {
  .services__list {
    grid-template-columns: repeat(2, 1fr);
  }
  .services__cta {
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 28px 32px;
  }
}
@media (min-width: 1100px) {
  .services__group {
    grid-template-columns: 260px 1fr;
    gap: 40px;
    padding-block: 40px;
  }
  .services__list {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}
</style>
