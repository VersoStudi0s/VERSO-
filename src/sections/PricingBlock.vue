<script setup lang="ts">
// Pacotes comerciais. Só aparece quando src/content/pricing.ts tiver itens.
import { RouterLink } from "vue-router";
import type { PricingPackage } from "../content/pricing";
import { track } from "../lib/analytics";

defineProps<{ packages: readonly PricingPackage[] }>();
const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
</script>

<template>
  <div class="pricing" aria-labelledby="pacotes-title">
    <h3 id="pacotes-title" class="label">Pacotes</h3>
    <ul role="list" class="pricing__list">
      <li v-for="item in packages" :key="item.id" class="pricing__item">
        <h4>{{ item.name }}</h4>
        <p class="pricing__price">a partir de <strong>{{ formatPrice(item.priceFrom) }}</strong></p>
        <ul role="list">
          <li v-for="line in item.scope" :key="line">{{ line }}</li>
        </ul>
        <RouterLink
          :to="{ path: '/', query: { servico: item.serviceId }, hash: '#contato' }"
          class="link-arrow"
          @click="track('pedido_orcamento', { servico: item.serviceId, posicao: 'pacotes' })"
          >Quero este pacote</RouterLink
        >
      </li>
    </ul>
    <p class="pricing__note">Valores de referência. O orçamento final depende do escopo combinado no briefing.</p>
  </div>
</template>

<style scoped>
.pricing {
  padding-block: 32px;
  border-top: 1px solid var(--line);
}
.pricing__list {
  display: grid;
  gap: 14px;
  margin-top: 16px;
}
.pricing__item {
  display: grid;
  gap: 10px;
  padding: 22px 20px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
}
.pricing__item h4 {
  font: 700 1.2rem / 1.2 var(--font-body);
}
.pricing__price strong {
  font: 400 1.8rem / 1 var(--font-display);
}
.pricing__item ul {
  font-size: var(--text-sm);
  color: var(--paper-dim);
}
.pricing__note {
  margin-top: 14px;
  font-size: var(--text-sm);
  color: var(--muted);
}
@media (min-width: 720px) {
  .pricing__list {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}
</style>
