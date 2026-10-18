<script setup lang="ts">
import {
  PhArrowRight,
  PhBrowsers,
  PhPenNib,
  PhFingerprint,
  PhImage,
  PhArrowUpRight,
} from "@phosphor-icons/vue";
import AssetImage from "../components/AssetImage.vue";
const services = [
  {
    title: "Websites e Landing Pages",
    description: "Interfaces responsivas e experiências digitais.",
    icon: PhBrowsers,
    value: "website",
  },
  {
    title: "UI/UX Design",
    description: "Fluxos, wireframes, interfaces e protótipos.",
    icon: PhPenNib,
    value: "uiux",
  },
  {
    title: "Identidade Visual",
    description: "Direção visual, logotipos e paletas.",
    icon: PhFingerprint,
    value: "identidade",
  },
  {
    title: "Materiais Gráficos",
    description: "Peças digitais e comunicação visual.",
    icon: PhImage,
    value: "grafico",
  },
];
</script>
<template>
  <section
    id="servicos"
    class="services frame section-pad reveal"
    aria-labelledby="services-title"
  >
    <AssetImage
      class="service-sculpture"
      name="escultura-cromada"
      :width="1254"
      :height="1254"
    />
    <div class="section-topline">
      <span class="eyebrow">O que eu faço</span
      ><span class="section-number">[03]</span>
    </div>
    <h2 id="services-title" class="section-heading">
      Serviços<br /><em>criativos.</em>
    </h2>
    <p class="service-intro">Da primeira ideia à experiência digital.</p>
    <div class="service-list">
      <RouterLink
        v-for="(service, index) in services"
        :key="service.title"
        :to="{ path: '/', hash: '#contato', query: { servico: service.value } }"
        class="service-row"
        ><span class="service-icon"
          ><component :is="service.icon" weight="light" :size="23" /></span
        ><span
          ><span class="service-name">{{ service.title }}</span
          ><span class="service-desc">{{ service.description }}</span></span
        ><PhArrowRight class="service-arrow" weight="light" :size="19" /><span
          class="sr-only"
          >— conversar sobre o serviço {{ index + 1 }}</span
        ></RouterLink
      >
    </div>
    <RouterLink to="/#contato" class="text-link service-cta"
      >Vamos criar algo juntos <PhArrowUpRight
    /></RouterLink>
  </section>
</template>
<style scoped>
.services {
  overflow: hidden;
  isolation: isolate;
}
.section-topline {
  position: relative;
  z-index: 1;
}
.service-sculpture {
  position: absolute;
  width: 230px;
  right: -60px;
  top: -50px;
  opacity: 0.55;
  z-index: -1;
  transform: rotate(-20deg);
}
.services .section-heading {
  font: 500 italic clamp(52px, 4.7vw, 80px)/0.87 var(--editorial);
  letter-spacing: -0.04em;
}
.service-intro {
  font-size: 11px;
  color: var(--muted);
  margin: 22px 0 30px;
}
.service-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.service-row {
  display: flex;
  align-items: center;
  gap: 13px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 15px 12px;
  background: #101012dd;
  transition:
    background 0.25s,
    border-color 0.25s,
    transform 0.25s;
}
.service-row:hover {
  background: #221216;
  border-color: #99404b;
  transform: translateX(3px);
}
.service-icon {
  background: #40171f66;
  color: var(--red-light);
  width: 36px;
  height: 36px;
  border: 1px solid #672c36;
  border-radius: 7px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.service-name {
  font-size: 12px;
  display: block;
  line-height: 1.5;
}
.service-desc {
  display: block;
  font-size: 9px;
  line-height: 1.5;
  color: var(--muted);
  margin-top: 4px;
}
.service-arrow {
  margin-left: auto;
  flex-shrink: 0;
  color: var(--pink);
}
.service-cta {
  margin-top: 28px;
  color: var(--red-light);
  font-size: 8px;
}
.service-row > span:nth-child(2) {
  min-width: 0;
}
@media (max-width: 767px) {
  .services .section-heading {
    font-size: 64px;
  }
  .service-intro {
    font-size: 12px;
  }
  .service-row {
    padding: 17px 12px;
  }
  .service-name {
    font-size: 12px;
  }
  .service-desc {
    font-size: 10px;
  }
  .service-cta {
    font-size: 9px;
  }
}
</style>
