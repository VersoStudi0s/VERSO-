<script setup lang="ts">
import { ref } from "vue";
import { PhArrowUpRight, PhArrowRight, PhAsterisk } from "@phosphor-icons/vue";
import { services } from "../data/services";
const active = ref<string>(services[0].id);
</script>
<template>
  <section
    id="servicos"
    class="services frame section-pad reveal"
    aria-labelledby="services-title"
  >
    <div class="section-topline">
      <span class="eyebrow">[02] / O que criamos</span
      ><span class="micro">Da ideia à experiência.</span>
    </div>
    <div class="services-heading" data-reveal>
      <h2 id="services-title">Serviços<br /><em>criativos.</em></h2>
      <p>
        Design e código para dar forma à sua próxima ideia.<br /><span
          >Quatro caminhos. Uma identidade própria.</span
        >
      </p>
      <PhAsterisk weight="thin" aria-hidden="true" />
    </div>
    <div class="service-list">
      <article
        v-for="service in services"
        :key="service.id"
        class="service-row"
        :class="{ 'service-active': active === service.id }"
        :aria-labelledby="`service-${service.id}`"
        @pointerenter="active = service.id"
        @focusin="active = service.id"
        data-reveal
      >
        <span class="service-number" aria-hidden="true"
          >{{ service.number }}<span>/</span></span
        >
        <div class="service-name">
          <h3 :id="`service-${service.id}`">{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
        <div class="service-details">
          <ul>
            <li v-for="item in service.deliverables" :key="item">{{ item }}</li>
          </ul>
          <p>{{ service.detail }}</p>
        </div>
        <div class="service-actions">
          <RouterLink
            :to="{
              path: '/',
              hash: '#projetos',
              query: { exemplos: service.id },
            }"
            class="text-link"
            :aria-label="`Ver exemplos de ${service.title}`"
            >Ver exemplos <PhArrowRight /></RouterLink
          ><RouterLink
            :to="{
              path: '/',
              hash: '#contato',
              query: { servico: service.id },
            }"
            class="service-budget text-link"
            :aria-label="`Pedir orçamento de ${service.title}`"
            >Pedir orçamento <PhArrowUpRight
          /></RouterLink>
        </div>
      </article>
    </div>
    <p class="services-note micro">
      Projetos com escopo, intenção e personalidade.
      <RouterLink to="/#processo"
        >Conheça o processo <PhArrowUpRight aria-hidden="true"
      /></RouterLink>
    </p>
  </section>
</template>
<style scoped>
.services {
  overflow: hidden;
  background: #100c0f;
}
.services-heading {
  display: grid;
  grid-template-columns: 1.3fr 1fr auto;
  gap: 45px;
  align-items: end;
  margin: 50px 0 60px;
}
.services-heading h2 {
  font: 600 clamp(65px, 7.7vw, 130px) / 0.8 var(--display);
  text-transform: uppercase;
  letter-spacing: -0.035em;
}
.services-heading h2 em {
  display: block;
  font: 500 italic 1.15em/0.9 var(--editorial);
  text-transform: none;
  color: var(--red);
}
.services-heading > p {
  color: var(--white);
  font-size: 16px;
  max-width: 31ch;
  padding-bottom: 10px;
}
.services-heading > p span {
  color: var(--muted);
  display: block;
  margin-top: 15px;
  font-size: 12px;
}
.services-heading > svg {
  width: 70px;
  height: 70px;
  color: var(--red);
  margin-bottom: 14px;
}
.service-list {
  border-top: 1px solid var(--control-line);
}
.service-row {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: 65px 1.4fr 1fr;
  gap: 25px 35px;
  align-items: start;
  padding: 36px 22px;
  border-bottom: 1px solid var(--line);
  transition: color 0.35s;
}
.service-row::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: #35151d;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.55s var(--ease);
}
.service-row::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--red);
  transform: scaleY(0);
  transition: transform 0.4s;
}
.service-active::before {
  transform: scaleX(1);
}
.service-active::after {
  transform: scaleY(1);
}
.service-number {
  font: 500 40px/1 var(--editorial);
  color: var(--pink);
}
.service-number > span {
  color: var(--red);
  font-size: 26px;
  margin-left: 9px;
}
.service-name h3 {
  font: 600 clamp(30px, 3.2vw, 52px) / 1.05 var(--display);
  letter-spacing: -0.015em;
  transition:
    transform 0.4s var(--ease),
    color 0.3s;
}
.service-active h3 {
  transform: translateX(8px);
  color: var(--white);
}
.service-name p {
  color: var(--muted);
  font-size: 13px;
  margin-top: 15px;
  max-width: 48ch;
}
.service-details {
  padding-top: 4px;
}
.service-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font: 11px/1.8 var(--mono);
}
.service-details li::before {
  content: "/";
  color: var(--red-light);
  margin-right: 10px;
}
.service-details p {
  color: var(--muted);
  font-size: 11px;
  margin-top: 14px;
}
.service-actions {
  grid-column: 2/-1;
  display: flex;
  justify-content: space-between;
  gap: 18px;
}
.service-actions .text-link {
  min-height: 44px;
  font-size: 10px;
}
.service-budget {
  color: var(--pink);
}
.service-budget svg {
  font-size: 24px;
}
.services-note {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  font-size: 9px;
}
.services-note a {
  display: flex;
  gap: 12px;
  align-items: center;
  min-height: 44px;
  color: var(--pink);
}
@media (max-width: 1023px) {
  .services-heading {
    grid-template-columns: 1.1fr 1fr;
    gap: 25px;
  }
  .services-heading > svg {
    display: none;
  }
  .service-row {
    grid-template-columns: 50px 1.1fr 1fr;
    gap: 22px;
    padding-inline: 15px;
  }
}
@media (max-width: 767px) {
  .services-heading {
    grid-template-columns: 1fr;
    gap: 25px;
    margin: 35px 0;
  }
  .services-heading h2 {
    font-size: clamp(66px, 18vw, 105px);
  }
  .services-heading > p {
    font-size: 14px;
    max-width: none;
  }
  .service-row {
    grid-template-columns: 35px 1fr;
    gap: 18px 14px;
    padding: 25px 10px;
  }
  .service-number {
    font-size: 29px;
  }
  .service-number > span {
    display: none;
  }
  .service-name h3 {
    font-size: 34px;
  }
  .service-name p {
    font-size: 13px;
  }
  .service-details {
    grid-column: 2;
  }
  .service-details ul {
    font-size: 10px;
  }
  .service-actions {
    grid-column: 1/-1;
    flex-wrap: wrap;
  }
  .service-actions .text-link {
    font-size: 9px;
    gap: 8px;
  }
  .service-active h3 {
    transform: translateX(3px);
  }
}
</style>
