<script setup lang="ts">
import { PhAsterisk, PhArrowUpRight } from "@phosphor-icons/vue";
import HeroSection from "../sections/HeroSection.vue";
import ProjectsSection from "../sections/ProjectsSection.vue";
import FeaturedProject from "../sections/FeaturedProject.vue";
import ServicesSection from "../sections/ServicesSection.vue";
import AboutSection from "../sections/AboutSection.vue";
import LabSection from "../sections/LabSection.vue";
import SkillsSection from "../sections/SkillsSection.vue";
import ContactSection from "../sections/ContactSection.vue";
import { useReveal } from "../composables/useReveal";
useReveal();
</script>
<template>
  <HeroSection />
  <div
    class="studio-strip"
    aria-label="Design, código, identidade e experimentação"
  >
    <span>Design com intenção</span><PhAsterisk weight="thin" /><span
      >Código com propósito</span
    ><PhAsterisk weight="thin" /><span>Identidade em cada detalhe</span
    ><PhArrowUpRight weight="light" />
  </div>
  <div class="home-sections">
    <ProjectsSection />
    <div class="middle-grid"><FeaturedProject /><ServicesSection /></div>
    <div class="bottom-grid">
      <AboutSection />
      <div class="creative-column"><LabSection /><SkillsSection /></div>
      <ContactSection />
    </div>
  </div>
</template>
<style scoped>
.home-sections {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
.studio-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  padding: 28px var(--gutter);
  font: 9px var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}
.studio-strip > svg {
  color: var(--red);
  font-size: 26px;
}
.studio-strip > svg:last-child {
  font-size: 22px;
}
.middle-grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: var(--gap);
}
.bottom-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  gap: var(--gap);
  align-items: start;
}
.creative-column {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
.bottom-grid :deep(.section-pad) {
  padding: 29px 27px;
}
@media (min-width: 1600px) {
  .bottom-grid :deep(.section-pad) {
    padding: 35px;
  }
}
@media (max-width: 1250px) {
  .bottom-grid {
    grid-template-columns: 1fr 1fr;
  }
  .bottom-grid > .contact {
    grid-column: 1/-1;
  }
  .bottom-grid :deep(.contact form) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 25px;
  }
  .bottom-grid :deep(.contact-fields) {
    grid-column: 1;
    grid-row: 1/3;
    display: grid;
    grid-template-columns: 1fr;
  }
  .bottom-grid :deep(.contact form > .field) {
    grid-column: 2;
  }
  .bottom-grid :deep(.contact form > .privacy-note),
  .bottom-grid :deep(.submit-contact),
  .bottom-grid :deep(.form-feedback) {
    grid-column: 1/-1;
  }
  .bottom-grid :deep(.contact h2) {
    font-size: 60px;
  }
  .bottom-grid :deep(.contact-intro) {
    font-size: 12px;
  }
  .bottom-grid :deep(.contact-plus) {
    top: 150px;
    right: 10%;
  }
  .bottom-grid :deep(.field label) {
    font-size: 10px;
  }
  .bottom-grid :deep(.field input),
  .bottom-grid :deep(.field select),
  .bottom-grid :deep(.field textarea) {
    font-size: 13px;
  }
  .bottom-grid :deep(.contact::before) {
    background-size: 60%;
    background-position: 100% 50%;
  }
}
@media (max-width: 767px) {
  .studio-strip {
    padding: 24px 11px;
    gap: 15px;
    font-size: 6px;
    letter-spacing: 0.03em;
  }
  .studio-strip span:nth-of-type(3),
  .studio-strip > svg:last-child {
    display: none;
  }
  .studio-strip > svg {
    font-size: 20px;
  }
  .middle-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }
  .bottom-grid > .contact {
    grid-column: auto;
  }
  .bottom-grid :deep(.section-pad) {
    padding: 25px 20px;
  }
  .bottom-grid :deep(.contact form) {
    display: block;
  }
  .bottom-grid :deep(.contact h2) {
    font-size: 55px;
  }
  .bottom-grid :deep(.field input),
  .bottom-grid :deep(.field textarea) {
    font-size: 16px;
  }
  .bottom-grid :deep(.field select) {
    font-size: 12px;
  }
  .bottom-grid :deep(.contact-plus) {
    right: 25px;
    top: 170px;
  }
  .bottom-grid :deep(.contact::before) {
    background-size: 100%;
    background-position: 70% 5%;
  }
}
</style>
